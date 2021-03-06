const {BaseBackendPanelHandler} = require('../../lib/BaseBackendPanelHandler');
const {Panel} = require('../../panels/Panel');
const {ActionButton} = require('../../panels/ActionButton');
const {Slider} = require('../../panels/Slider');
const {Switch} = require('../../panels/Switch');
const {Swipe} = require('../../panels/Swipe');
const {LabelText} = require('../../panels/LabelText');

const {UpdateValueComponentEvent} = require('../../panels/event/UpdateValueComponentEvent');
const {DisableComponentEvent} = require('../../panels/event/DisableComponentEvent');

class XbmcBackendPanels extends BaseBackendPanelHandler {

  constructor(backend) {

    super(backend);

    let defaultButtonsPanel = new Panel(this.backendId, 'defaultButtonsPanel');
    defaultButtonsPanel
      .addRow([
        new ActionButton(this.backendId, 'Input.Home', 'Home', 'home'),
        new ActionButton(this.backendId, 'Input.ExecuteAction', 'Info', 'info', 'info'),
        new ActionButton(this.backendId, 'Input.ExecuteAction', 'Menu', 'menu', 'menu'),
        new ActionButton(this.backendId, 'Input.ExecuteAction', 'Back', 'settings_backup_restore', 'back')
      ]);

    this._addPanel(defaultButtonsPanel);

    let playerPanel = new Panel(this.backendId,'playerButtonsPanel');
    playerPanel.addRow([
      new LabelText(this.backendId, 'Currently playing: ','playerItem.item.label')
    ]);
    playerPanel.addRow([
      new ActionButton(this.backendId, 'Input.ExecuteAction','','skip_previous','skipprevious'),
      new ActionButton(this.backendId, 'Input.ExecuteAction','','skip_previous','analogseekback'),
      new ActionButton(this.backendId, 'Input.ExecuteAction','','play_arrow','playpause'),
      new ActionButton(this.backendId, 'Input.ExecuteAction','','stop','stop'),
      new ActionButton(this.backendId, 'Input.ExecuteAction','','skip_next','analogseekforward'),
      new ActionButton(this.backendId, 'Input.ExecuteAction','','skip_next','skipnext')
    ]);
    this._addPanel(playerPanel);

    let volumePanel = new Panel(this.backendId, 'volumePanel');
    volumePanel
      .addRow([
        new Slider(this.backendId, 'Application.SetVolume', 'Vol', 'volume_mute', 0, 100, 5)
          .addEvent(new UpdateValueComponentEvent('volume'))
          .addEvent(new DisableComponentEvent('muted', [true]))
        ,
        new Switch(this.backendId, 'Application.SetMute', 'volume_off', 'Mute', true, 'Loud', false)
          .addEvent(new UpdateValueComponentEvent('muted'))
      ])
    ;
    this._addPanel(volumePanel);

    let swipePanel = new Panel(this.backendId, 'swipePanel');
    let swipeInput = new Swipe(this.backendId);
    swipeInput
      .addLeftAction('Input.ExecuteAction', 'left')
      .addRightAction('Input.ExecuteAction', 'right')
      .addUpAction('Input.ExecuteAction', 'up')
      .addDownAction('Input.ExecuteAction', 'down')
      .addPressAction('Input.ExecuteAction', 'select');

    swipePanel
      .addRow([swipeInput]);
    this._addPanel(swipePanel);


    let defaultPanel = new Panel(this.backendId, 'defaultsPanel');
    defaultPanel
      .addRow([defaultButtonsPanel])
      .addRow([swipePanel])
      .addRow([volumePanel])
      .addRow([playerPanel])
    ;

    this._addDefaultPanel(defaultPanel);

  }


}


exports.XbmcBackendPanels = XbmcBackendPanels;