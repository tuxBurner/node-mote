const {ActionComponent} = require('./ActionComponent');

class Slider extends ActionComponent {
  constructor(action, txt, icon, min, max,step) {
    super('slider', action, txt, icon)
    this.min = min;
    this.max = max;
    this.step = step || 1;
  }
}

exports.Slider = Slider;