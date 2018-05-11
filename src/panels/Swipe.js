const {BaseComponent} = require('./BaseComponent');
const {SwipeAction} = require('./SwipeAction');

class Swipe extends BaseComponent {
  constructor(backendId) {
    super(backendId, 'swipe');
    this.swipeleft = null;
    this.swiperight = null;
    this.swipeup = null;
    this.swipedown = null;
    this.tap = null;
    this.press = null;
  }

  addUpAction(action, value) {
    this.swipeup = new SwipeAction(action, value);
    return this;
  }

  addDownAction(action, value) {
    this.swipedown = new SwipeAction(action, value);
    return this;
  }

  addLeftAction(action, value) {
    this.swipeleft = new SwipeAction(action, value);
    return this;
  }

  addRightAction(action, value) {
    this.swiperight = new SwipeAction(action, value);
    return this;
  }

  addTapAction(action, value) {
    this.tap = new SwipeAction(action, value);
    return this;
  }

  addPressAction(action, value) {
    this.press = new SwipeAction(action, value);
    return this;
  }
}


exports.Swipe = Swipe;