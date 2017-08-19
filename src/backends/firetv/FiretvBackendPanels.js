const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');
const {Swipe} = require('../../panels/Swipe');

class FiretvBackendPanels extends BaseBackendPanelHandler {

  constructor() {

    super();

    let buttonsPanel = new Panel('buttonsPannel');
    buttonsPanel
      .addRow([
        new ActionButton('Input', '', 'settings_backup_restore', 'KEYCODE_BACK'),
        new ActionButton('Input', '', 'home', 'KEYCODE_HOME'),
        new ActionButton('Input', '', 'menu', 'KEYCODE_MENU')
      ])
      .addRow([
        new ActionButton('Input', '', 'fast_rewind', 'KEYCODE_MEDIA_REWIND'),
        new ActionButton('Input', '', 'play_arrow', 'KEYCODE_MEDIA_PLAY_PAUSE'),
        new ActionButton('Input', '', 'fast_forward', 'KEYCODE_MEDIA_FAST_FORWARD'),
      ]);

    this._addPanel(buttonsPanel)

    let swipeInput = new Swipe();
    swipeInput
      .addLeftAction('Input', 'KEYCODE_DPAD_LEFT')
      .addRightAction('Input', 'KEYCODE_DPAD_RIGHT')
      .addUpAction('Input', 'KEYCODE_DPAD_UP')
      .addDownAction('Input', 'KEYCODE_DPAD_DOWN')
      .addTapAction('Input', 'KEYCODE_DPAD_CENTER');

    let swipePanel = new Panel('swipePanel');
    swipePanel
      .addRow([swipeInput]);
    this._addPanel(swipePanel)

    let defaultPanel = new Panel('defaultsPanel');
    defaultPanel
      .addRow([buttonsPanel])
      .addRow([swipePanel]);
    this._addDefaultPanel(defaultPanel);

  }


}

module.exports = new FiretvBackendPanels();