"use babel";

import TheAtomDuckView from "./the-atom-duck-view";
import { CompositeDisposable } from "atom";

export default {
  theAtomDuckView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.theAtomDuckView = new TheAtomDuckView(state.theAtomDuckViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.theAtomDuckView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "the-atom-duck:toggle": () => this.toggle(),
        "the-atom-duck:escape": () =>
          this.modalPanel.isVisible() && this.modalPanel.hide()
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.theAtomDuckView.destroy();
  },

  serialize() {
    return {
      theAtomDuckViewState: this.theAtomDuckView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      this.theAtomDuckView.updateMessage();
      return this.modalPanel.show();
    }
  }
};
