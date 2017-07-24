/**
 * A basic component doing an action
 */
class BaseComponent {

  constructor(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }
}

exports.BaseComponent = BaseComponent;