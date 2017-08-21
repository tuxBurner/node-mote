const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');
const {Slider} = require('../../panels/Slider');
const {Select} = require('../../panels/Select');
const {Switch} = require('../../panels/Switch');

class DenonBackendPanels extends BaseBackendPanelHandler {

  constructor(backend) {

    super(backend);

    let buttonsPanel = new Panel(this.backendId, 'buttonsPannel');
    buttonsPanel
      .addRow([
        new ActionButton(this.backendId, 'POWER', '', 'power')
      ]);

    /**
     * Panel for selecting the inputs
     */
    let inputPanel = new Panel(this.backendId,'inputPanel');
    inputPanel.addRow([
      new Select(this.backendId,'SETINPUT','','Input',this.backend.settings.config.inputs)
    ]);

    /**
     * Panel for selecting the inputs
     */
    let surroundPanel = new Panel(this.backendId,'surroundPanel');
    inputPanel.addRow([
      new Select(this.backendId,'SETSURROUND','','Sound Mode:',this.backend.settings.config.surroundModes)
    ]);


    /**
     * Volume handling panel
     */
    let volumePanel = new Panel(this.backendId, 'volumePanel');
    volumePanel
      .addRow([
        new Slider(this.backendId, 'SETVOLUME', 'Vol', 'volume_mute', 0, this.backend.settings.config.maxVol, 2),
        new Switch(this.backendId, 'SETMUTE', 'volume_off', 'Mute', 'ON', 'Loud', 'OFF')
      ])
    ;
    this._addPanel(volumePanel);


    this._addPanel(buttonsPanel)



    let defaultPanel = new Panel(this.backendId, 'defaultsPanel');
    defaultPanel
      .addRow([buttonsPanel])
      .addRow([volumePanel])
      .addRow([inputPanel,surroundPanel]);
    this._addDefaultPanel(defaultPanel);

  }


}

exports.DenonBackendPanels = DenonBackendPanels;