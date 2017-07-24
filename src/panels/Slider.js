const {ActionComponent} = require('./ActionComponent');

class Slider extends ActionComponent {
  constructor(action, txt, icon, min, max) {
    super('slider', action, txt, icon)
    this.min = min;
    this.max = max;
  }
}

exports.Slider = Slider;