const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {Row} = require('../../panels/Row');
const {ActionButton} = require('../../panels/ActionButton');
const {Slider} = require('../../panels/Slider');
const {Switch} = require('../../panels/Switch');

class XbmcBackendPanels extends BaseBackendPanelHandler {

  constructor() {

    super();

    let defaultButtonsPanel = new Panel('defaultButtonsPanel');
    defaultButtonsPanel
      .addRow([
        new ActionButton('Input.Info', 'Info', 'info'),
        new ActionButton('Input.Up', 'Up', 'arrow_upward'),
        new ActionButton('Input.Back', 'Back', 'settings_backup_restore')
      ])
      .addRow([
        new ActionButton('Input.Left', 'Left', 'arrow_back'),
        new ActionButton('Input.Select', 'Select', 'center_focus_strong'),
        new ActionButton('Input.Right', 'Right', 'arrow_forward')
      ])
      .addRow([
        new ActionButton('Input.Home', 'Home', 'home'),
        new ActionButton('Input.Down', 'Down', 'arrow_downward'),
        new ActionButton('Input.ContextMenu', 'Menu', 'menu')
      ]);
    this._addPanel(defaultButtonsPanel);

    let volumePanel = new Panel('volumePanel');
    volumePanel
      .addRow([
        new Slider('Application.SetVolume', 'Vol', 'volume_mute', 0, 100,5),
        new Switch('Application.SetMute','volume_off', 'Mute', true, 'Loud', false)
      ]);
    this._addPanel(volumePanel);

    let defaultPanel = new Panel('defaultsPanel');
    defaultPanel
      .addRow([defaultButtonsPanel])
      .addRow([volumePanel]);

    this._addDefaultPanel(defaultPanel);

  }


}

module.exports = new XbmcBackendPanels();