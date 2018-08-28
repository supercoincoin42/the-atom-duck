"use babel";

const { duck: duckImageBase64 } = require("./base64-images");

// List of things the duck can say
const DUCK_MESSAGES = [
  "Keep going, you're great!",
  "You'll solve the issue in no time!",
  "You can do it, I believe in you!",
  "The problem is obvious, look again!",
  "Keep going, you're almost there!",
  "You will eventually find the solution!",
  "Have you checked all the config parameters?",
  "Don't be angry at the computer, it's your fault!",
  "Let's take a little break and come back later!",
  "Have you tried to turn it off and on again?"
];

let randNum = null;

const getDuckMessage = () => {
  const prevRandNum = randNum || -1;
  randNum = parseInt(Math.random() * DUCK_MESSAGES.length);
  if (randNum === prevRandNum) {
    randNum = (randNum + 1) % DUCK_MESSAGES.length;
  }
  return DUCK_MESSAGES[randNum];
};

export default class TheAtomDuckView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("the-atom-duck");

    // Create top message element
    const topMessage = document.createElement("div");
    topMessage.id = "duck-message-top";
    topMessage.textContent = "Quack quack!";
    this.element.appendChild(topMessage);

    // Create duck image within its rapper
    this.imageWrapper = document.createElement("div");
    this.imageWrapper.addEventListener("click", this.updateMessage);
    const image = document.createElement("img");
    image.id = "duck-image";
    image.src = duckImageBase64;
    this.imageWrapper.appendChild(image);
    this.element.appendChild(this.imageWrapper);

    // Create bottom message element
    const bottomMessage = document.createElement("div");
    bottomMessage.id = "duck-message-bottom";
    bottomMessage.textContent = getDuckMessage();
    this.element.appendChild(bottomMessage);

    // Create hide button element
    this.hideButton = document.createElement("button");
    this.hideButton.id = "duckduck-hide-button";
    this.hideButton.addEventListener("click", this.hideBottomMessage);
    this.hideButton.textContent = "OK";
    this.element.appendChild(this.hideButton);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.imageWrapper.removeEventListener("click", this.updateMessage);
    this.hideButton.removeEventListener("click", this.hideBottomMessage);
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  updateMessage() {
    // 'this' keyword should NOT be used here
    const duckMessage = document.getElementById("duck-message-bottom");
    duckMessage.style.display = "block";
    duckMessage.textContent = getDuckMessage();
    document.getElementById("duckduck-hide-button").style.display = "inline";
  }

  hideBottomMessage() {
    // 'this' keyword should NOT be used here
    document.getElementById("duck-message-bottom").style.display = "none";
    document.getElementById("duckduck-hide-button").style.display = "none";
  }
}
