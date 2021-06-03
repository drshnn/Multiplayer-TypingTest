const users = [];

// join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}
// user leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index != -1) {
    console.log(users.splice(index, 1)[0]);
    return users.splice(index, 1)[0];
  }
}
module.exports = {
  userJoin,
  userLeave,
};
