const {ActionComponent} = require('./ActionComponent');

class Select extends ActionComponent {
  constructor(backendId, action, icon, text, values) {
    super(backendId, 'select', action, text, icon);
    this.values = values;
  }
}

exports.Select = Select;