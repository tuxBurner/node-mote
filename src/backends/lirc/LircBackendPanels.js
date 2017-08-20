const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');

class LircBackendPanels extends BaseBackendPanelHandler {

  constructor(backend) {

    super(backend);

    let buttonsPanel = new Panel(this.backendId, 'buttonsPannel');
    let buttonRows = this.backend.settings.config.buttons;
    for(let rowIdx in buttonRows) {
      let buttons = buttonRows[rowIdx];

      let actionButtons = [];

      for(let buttonKey in buttons) {
        let buttonIcon = buttons[buttonKey];
        actionButtons.push(new ActionButton(this.backendId, buttonKey, '', buttonIcon));
      }

      buttonsPanel.addRow(actionButtons);

    }


    this._addDefaultPanel(buttonsPanel);

  }


}

exports.LircBackendPanels = LircBackendPanels;