const {BaseComponent} = require('./BaseComponent');

/**
 * A basic component doing an action
 */
class ActionComponent extends BaseComponent {

  constructor(type, action, txt, icon) {
    super(type);
    this.action = action;
    this.txt = txt;
    this.icon = icon;
  }
}

exports.ActionComponent = ActionComponent;