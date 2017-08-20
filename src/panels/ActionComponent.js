const {BaseComponent} = require('./BaseComponent');

/**
 * A basic component doing an action
 */
class ActionComponent extends BaseComponent {

  constructor(backendId, type, action, txt, icon) {
    super(backendId,type);
    this.action = action;
    this.txt = txt;
    this.icon = icon;
  }
}

exports.ActionComponent = ActionComponent;