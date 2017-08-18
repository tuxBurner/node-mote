const {ActionComponent} = require('./ActionComponent');

/**
 * Class for a button in the gui
 */
class ActionButton extends ActionComponent {

  /**
   * Constructor for the ActionButton
   * @param {string} action the action the button should perform on the backend
   * @param {string} txt the text which is to display on the button
   * @param {string} icon the icon the button has
   * @param {string} value the payload value the button sends
   */
  constructor(action, txt, icon, value) {
    super('abutton', action, txt, icon);
    this.value = value || '';
  }

}

exports.ActionButton = ActionButton;