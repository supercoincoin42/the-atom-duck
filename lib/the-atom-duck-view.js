"use babel";

const { duck: duckImageBase64 } = require("./base64-images");

export default class TheAtomDuckView {
  constructor(serializedState) {
    // For all duck messages, a duck greeting message!
    this.duckMessagePrefix = "Quack quack! <br /><br />";

    // List of things the duck can say
    this.duckMessages = [
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

    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("the-atom-duck");

    // Create message element
    const message = document.createElement("div");
    message.id = "duck-message";
    message.innerHTML = this.getDuckMessage();
    this.element.appendChild(message);

    // Create duck image within its rapper
    const imageWrapper = document.createElement("div");
    message.classList.add("duck-wrapper");
    const image = document.createElement("img");
    image.id = "duck-image";
    image.src = duckImageBase64;
    image.classList.add("duck");
    imageWrapper.appendChild(image);

    this.element.appendChild(imageWrapper);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getDuckMessage() {
    const prevRandNum = this.randNum || -1;
    this.randNum = parseInt(Math.random() * this.duckMessages.length);
    if (this.randNum === prevRandNum) {
      this.randNum = (this.randNum + 1) % this.duckMessages.length;
    }
    return this.duckMessagePrefix + " " + this.duckMessages[this.randNum];
  }

  updateMessage() {
    document.getElementById("duck-message").innerHTML = this.getDuckMessage();
  }
}
