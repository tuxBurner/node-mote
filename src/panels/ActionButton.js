const {ActionComponent} = require('./ActionComponent');

/**
 * Class for a button in the gui
 */
class ActionButton extends ActionComponent {

  constructor(action, txt, icon, value) {
    super('abutton', action, txt, icon);
    this.value = value || '';
  }

}

exports.ActionButton = ActionButton;