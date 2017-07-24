const {ActionComponent} = require('./ActionComponent');

/**
 * Class for a button in the gui
 */
class ActionButton extends ActionComponent {

  constructor(action, txt, icon) {
    super('abutton', action, txt, icon);
  }

}

exports.ActionButton = ActionButton;