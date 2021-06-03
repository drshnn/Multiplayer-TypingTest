function startTyping(text) {
  console.log("bhai kaam karjaa");
  const typingDiv = document.getElementById("typing");

  const text =
    "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.";

  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
  });

  let cursorIndex = 0;
  let currentPointer = characters[cursorIndex];
  let mistakes = 0;
  currentPointer.classList.add("cursor");

  let startTime = null;
  let endTime = null;
  document.addEventListener("keydown", ({ key }) => {
    console.log(key);
    if (!startTime) {
      startTime = new Date();
    }

    if (key === currentPointer.innerText) {
      if (currentPointer.classList.contains("cursor")) {
        currentPointer.classList.remove("cursor");
      } else if (currentPointer.classList.contains("incorrect")) {
        currentPointer.classList.remove("cursor");
      }
      // currentPointer.classList.add("correct");
      currentPointer = characters[++cursorIndex];
    } else if (
      key !== currentPointer.innerText &&
      key !== "Shift" &&
      key !== "Backspace" &&
      key !== "Control"
    ) {
      mistakes += 1;
      currentPointer.classList.remove("cursor");
      currentPointer.classList.add("incorrect");
    }
    if (cursorIndex >= characters.length) {
      endTime = new Date();
      const tTime = endTime - startTime;
      const tInseconds = tTime / 1000;
      const numberOfChar = characters.length;
      const cpm = (numberOfChar * 60) / tInseconds;
      alert(`total mistakes : ${mistakes}, cpm : ${parseInt(cpm, 10)}`);
      window.location.reload();
      return;
    }
    currentPointer.classList.add("cursor");
  });
}

module.exports = startTyping;
