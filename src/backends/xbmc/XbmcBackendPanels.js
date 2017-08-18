const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');
const {Slider} = require('../../panels/Slider');
const {Switch} = require('../../panels/Switch');
const {Swipe} = require('../../panels/Swipe');
const {UpdateValueComponentEvent} = require('../../panels/event/UpdateValueComponentEvent');
const {DisableComponentEvent} = require('../../panels/event/DisableComponentEvent');

class XbmcBackendPanels extends BaseBackendPanelHandler {

  constructor() {

    super();

    let defaultButtonsPanel = new Panel('defaultButtonsPanel');
    defaultButtonsPanel
      .addRow([
        new ActionButton('Input.ExecuteAction', 'Info', 'info', 'info'),
        new ActionButton('Input.ExecuteAction', 'Up', 'arrow_upward', 'up'),
        new ActionButton('Input.ExecuteAction', 'Back', 'settings_backup_restore', 'back')
      ])
      .addRow([
        new ActionButton('Input.ExecuteAction', 'Left', 'arrow_back', 'left'),
        new ActionButton('Input.ExecuteAction', 'Select', 'center_focus_strong', 'select'),
        new ActionButton('Input.ExecuteAction', 'Right', 'arrow_forward', 'right')
      ])
      .addRow([
        new ActionButton('Input.Home', 'Home', 'home'),
        new ActionButton('Input.ExecuteAction', 'Down', 'arrow_downward', 'down'),
        new ActionButton('Input.ExecuteAction', 'Menu', 'menu', 'menu')
      ]);
    this._addPanel(defaultButtonsPanel);

    let volumePanel = new Panel('volumePanel');
    volumePanel
      .addRow([
        new Slider('Application.SetVolume', 'Vol', 'volume_mute', 0, 100, 5)
          .addEvent(new UpdateValueComponentEvent('volume'))
          .addEvent(new DisableComponentEvent('muted', [true]))
      ,
      new Switch('Application.SetMute', 'volume_off', 'Mute', true, 'Loud', false)
        .addEvent(new UpdateValueComponentEvent('muted'))
  ])
    ;
    this._addPanel(volumePanel);

    let swipePanel = new Panel('swipePanel');
    let swipeInput = new Swipe();
    swipeInput
      .addLeftAction('Input.ExecuteAction', 'left')
      .addRightAction('Input.ExecuteAction', 'right')
      .addUpAction('Input.ExecuteAction', 'up')
      .addDownAction('Input.ExecuteAction', 'down')
      .addTapAction('Input.ExecuteAction', 'select');

    swipePanel
      .addRow([swipeInput]);
    this._addPanel(swipePanel);


    let defaultPanel = new Panel('defaultsPanel');
    defaultPanel
      .addRow([defaultButtonsPanel])
      .addRow([swipePanel])
      .addRow([volumePanel]);

    this._addDefaultPanel(defaultPanel);

  }


}

module.exports = new XbmcBackendPanels();