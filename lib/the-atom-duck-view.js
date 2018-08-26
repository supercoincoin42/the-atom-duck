"use babel";

const { duck: duckImageBase64 } = require("./base64-images");

export default class TheAtomDuckView {
  constructor(serializedState) {
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

    // Create top message element
    const topMessage = document.createElement("div");
    topMessage.id = "duck-message-top";
    topMessage.innerHTML = "Quack quack!";
    this.element.appendChild(topMessage);

    // Create duck image within its rapper
    const imageWrapper = document.createElement("div");
    imageWrapper.addEventListener("click", () => this.updateMessage());
    const image = document.createElement("img");
    image.id = "duck-image";
    image.src = duckImageBase64;
    imageWrapper.appendChild(image);
    this.element.appendChild(imageWrapper);

    // Create bottom message element
    const bottomMessage = document.createElement("div");
    bottomMessage.id = "duck-message-bottom";
    bottomMessage.innerHTML = this.getDuckMessage();
    this.element.appendChild(bottomMessage);

    // Create hide button element
    const hideButton = document.createElement("button");
    hideButton.id = "hide-button";
    hideButton.addEventListener("click", () => {
      document.getElementById("duck-message-bottom").style.display = "none";
      document.getElementById("hide-button").style.display = "none";
    });
    hideButton.textContent = "OK!";
    this.element.appendChild(hideButton);
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
    return this.duckMessages[this.randNum];
  }

  updateMessage() {
    document.getElementById("duck-message-bottom").style.display = "block";
    document.getElementById(
      "duck-message-bottom"
    ).innerHTML = this.getDuckMessage();
    document.getElementById("hide-button").style.display = "inline";
  }
}
