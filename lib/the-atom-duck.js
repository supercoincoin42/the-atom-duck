"use babel";

import TheAtomDuckView from "./the-atom-duck-view";
import { CompositeDisposable } from "atom";

export default {
  theAtomDuckView: null,
  duckPanel: null,
  subscriptions: null,

  activate(state) {
    this.theAtomDuckView = new TheAtomDuckView(state.theAtomDuckViewState);
    this.duckPanel = atom.workspace.addRightPanel({
      item: this.theAtomDuckView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "the-atom-duck:toggle": () => this.toggle()
      })
    );
  },

  deactivate() {
    this.duckPanel.destroy();
    this.subscriptions.dispose();
    this.theAtomDuckView.destroy();
  },

  serialize() {
    return {
      theAtomDuckViewState: this.theAtomDuckView.serialize()
    };
  },

  toggle() {
    if (this.duckPanel.isVisible()) {
      return this.duckPanel.hide();
    } else {
      this.theAtomDuckView.updateMessage();
      return this.duckPanel.show();
    }
  }
};
