//  -----------------------------------------------------
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

// user info
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// } = require("./utils/users");

// room
var roomno = 1;
var clp;
let roomInfo = {};
let delRoom;
let index;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
// set static folder
app.use(express.static(path.join(__dirname, "/public")));
let count = 0;
// Run when a client connects

if (io.of("/").sockets.size === 0) {
  roomno = 1;
  clp = 0;
}

io.on("connection", (socket) => {
  // console.log("on join", socket.id)

  socket.join(roomno);

  const id = socket.id;
  if (roomInfo[roomno]) {
    roomInfo[roomno].push(id);
  } else {
    roomInfo[roomno] = [id];
  }
  console.log(roomInfo);
  clp = roomInfo[roomno].length;
  // console.log(clp);
  //Send this event to everyone in the room.
  io.sockets.in(roomno).emit("connectToRoom", { roomno, clp });
  if (clp === 3) {
    roomno++;
  }

  socket.on("disconnect", () => {
    for (const roomno in roomInfo) {
      if (roomInfo[roomno].includes(socket.id)) {
        delRoom = roomno;
        index = roomInfo[roomno].indexOf(socket.id);
      }
    }
    delete roomInfo[delRoom].splice(index, 1);
    console.log("after deleting", roomInfo);
    const delclp = roomInfo[delRoom].length;
    // let obj = { delRoom, delclp };
    // console.log("room:", obj.delclp === delclp);
    // io.sockets.in(delRoom).emit("connectToRoom", { delRoom, delclp });

    io.to(delRoom).emit("connectToRoom", { roomno, clp });
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
