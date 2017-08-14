const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for xbmc/kodi backends *
 * https://github.com/PaulAvery/kodi-ws
 * http://kodi.wiki/view/JSON-RPC_API/v8
 * http://kodi.wiki/view/JSON-RPC_API/Examples
 */
class XbmcBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);

    // see http://kodi.wiki/view/JSON-RPC_API/v8#Notifications_2
    // handle 'System.OnQuit'
    this.getStateNotifications = ['Application.OnVolumeChanged',
      'Input.OnInputFinished',
      'Player.OnPause',
      'Player.OnPlay',
      'Player.OnStop',
      'Player.OnPropertyChanged',
      'Player.OnSeek',
      'Player.OnSpeedChanged'];

    this.kodi = require('kodi-ws');

    this.connection = null;

    const instance = this;

    this.kodi(this.settings.config.host, this.settings.config.port)
      .then(
        function(connection) {

          instance.logInfo("Connected");
          instance.connection = connection;

          instance.getState();

          // register the notifications which trigger a get state event
          for(let idx in  instance.getStateNotifications) {
            connection.notification(instance.getStateNotifications[idx], function() {
              instance.getState();
            });
          }
        });
  }


  /**
   * Gets the current state from kodi and sends it to the frontend
   */
  getState() {

    let batch = this.connection.batch();

    let applicationProps = batch.Application.GetProperties({properties: ['muted', 'volume']});
    let guiProps = batch.GUI.GetProperties({properties: ['currentcontrol', 'currentwindow', 'fullscreen']});
    let activPlayers = batch.Player.GetActivePlayers();
    let playerProps = batch.Player.GetProperties({
      playerid: 0,
      properties: ['time', 'totaltime', 'percentage', 'type']
    });
    let playerCurrentItem = batch.Player.GetItem({playerid: 0});


    // TODO:  PVR.GetChannels
    batch.send();

    const instance = this;

    Promise.all([applicationProps, guiProps, activPlayers, playerProps, playerCurrentItem])
      .then(function(data) {


        let currentState = {
          volume: data[0].volume,
          muted: data[0].muted,
          currentWindow: data[1].currentwindow,
          currentControl: data[1].currentcontrol,
          fullScreen: data[1].fullscreen
        };

        if(data[2].length != 0) {
          currentState.playerType = data[2][0].type;
          currentState.playerInfo = data[3];
          currentState.playerItem = data[4];
        } else {
          currentState.playerType = 'none';
          currentState.playerInfo = 'none';
          currentState.playerItem = 'none'
        }

        instance.logDebug('Got Info from backend: ', currentState);

        instance.emitBackendState(currentState);
      });
  }


  performAction(action, payload) {


    // TODO: http://kodi.wiki/view/JSON-RPC_API/v8#GUI.ActivateWindow
    // TODO: GUI.SetFullscreen
    // TODO: check for more http://kodi.wiki/view/JSON-RPC_API/v8#Input.Action

    // could not find home in Input.ExecuteAction
    if(action === 'Input.Home') {
      this.connection.run('Input.Home');
    }

    // see http://kodi.wiki/view/JSON-RPC_API/v8#Input.Action
    if(action === 'Input.ExecuteAction' && payload.val !== undefined) {
      this.connection.run('Input.ExecuteAction', {action: payload.val});
    }

    if(action === 'Application.SetVolume' && payload.val !== undefined) {
      this.connection.run('Application.SetVolume', Number(payload.val));
      return;
    }


    if(action === 'Application.SetMute') {
      this.connection.run('Application.SetMute', payload.val);//Application.SetMute(false);
    }

  }
}

exports.XbmcBackendHandler = XbmcBackendHandler;