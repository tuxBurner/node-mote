const {BaseComponent} = require('./BaseComponent');
const {SwipeAction} = require('./SwipeAction');

class Swipe extends BaseComponent {
  constructor() {
    super('swipe');
    this.leftAction = null;
    this.rightAction = null;
    this.upAction = null;
    this.downAction = null;
    this.tapAction = null;
  }

  addUpAction(action, value) {
    this.upAction = new SwipeAction(action, value);
    return this;
  }

  addDownAction(action, value) {
    this.downAction = new SwipeAction(action, value);
    return this;
  }

  addLeftAction(action, value) {
    this.leftAction = new SwipeAction(action, value);
    return this;
  }

  addRightAction(action, value) {
    this.rightAction = new SwipeAction(action, value);
    return this;
  }

  addTapAction(action, value) {
    this.tapAction = new SwipeAction(action, value);
    return this;
  }
}


exports.Swipe = Swipe;