const {BaseComponent} = require('./BaseComponent');

class Row extends BaseComponent {

  constructor() {
    super('row');
    this.components = [];
  }

  add(component) {
    this.components.push(component);
    return this;
  }

  addComponents(components) {
    for(let idx in components) {
      this.add(components[idx]);
    }
  }

}

exports.Row = Row;