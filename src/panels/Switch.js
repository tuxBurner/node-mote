const {ActionComponent} = require('./ActionComponent');

class Switch extends ActionComponent {
  constructor(backendId, action, icon, firstText, firstVal, secondText, secondVal) {
    super(backendId, 'switch', action, firstText, icon);
    this.txt2 = secondText;
    this.firstVal = firstVal;
    this.secondVal = secondVal;
  }
}

exports.Switch = Switch;