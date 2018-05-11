const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');
const {Swipe} = require('../../panels/Swipe');

class FiretvBackendPanels extends BaseBackendPanelHandler {

  constructor(backend) {

    super(backend);

    let buttonsPanel = new Panel(this.backendId, 'buttonsPannel');
    buttonsPanel
      .addRow([
        new ActionButton(this.backendId, 'Input', '', 'settings_backup_restore', 'KEYCODE_BACK'),
        new ActionButton(this.backendId, 'Input', '', 'home', 'KEYCODE_HOME'),
        new ActionButton(this.backendId, 'Input', '', 'menu', 'KEYCODE_MENU')
      ])
      .addRow([
        new ActionButton(this.backendId, 'Input', '', 'fast_rewind', 'KEYCODE_MEDIA_REWIND'),
        new ActionButton(this.backendId, 'Input', '', 'play_arrow', 'KEYCODE_MEDIA_PLAY_PAUSE'),
        new ActionButton(this.backendId, 'Input', '', 'fast_forward', 'KEYCODE_MEDIA_FAST_FORWARD'),
      ]);

    this._addPanel(buttonsPanel)

    let swipeInput = new Swipe(this.backendId);
    swipeInput
      .addLeftAction('Input', 'KEYCODE_DPAD_LEFT')
      .addRightAction('Input', 'KEYCODE_DPAD_RIGHT')
      .addUpAction('Input', 'KEYCODE_DPAD_UP')
      .addDownAction('Input', 'KEYCODE_DPAD_DOWN')
      .addTapAction('Input', 'KEYCODE_DPAD_CENTER');

    let swipePanel = new Panel(this.backendId, 'swipePanel');
    swipePanel
      .addRow([swipeInput]);
    this._addPanel(swipePanel);

    let defaultPanel = new Panel(this.backendId, 'defaultsPanel');
    defaultPanel
      .addRow([buttonsPanel])
      .addRow([swipePanel]);
    this._addDefaultPanel(defaultPanel);

  }


}

exports.FiretvBackendPanels = FiretvBackendPanels;