const {BaseComponent} = require('./BaseComponent');
const {Row} = require('./Row');

/**
 * Descripes a panel
 */
class Panel extends BaseComponent {

  constructor(backendId, name) {
    super(backendId, 'panel');
    this.name = name;
    this.components = [];
  }

  add(component) {
    this.components.push(component);
    return this;
  }

  addRow(rowComponents) {
    let row = new Row(this.backendId);
    row.addComponents(rowComponents);
    this.add(row);
    return this;
  }

}

exports.Panel = Panel;