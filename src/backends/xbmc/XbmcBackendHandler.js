const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for xbmc/kodi backends *
 * https://github.com/PaulAvery/kodi-ws
 * http://kodi.wiki/view/JSON-RPC_API/v8
 */

class XbmcBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);

    /*let kodiRpc = require('node-kodi');

    this.kodiRpc = new kodiRpc({
      url: this.settings.config.host,
      user: this.settings.config.user,
      password: this.settings.config.pass
    });*/

    this.kodi = require('kodi-ws');

    this.connection = null;

    const instance = this;

    this.kodi(this.settings.config.host, this.settings.config.port)
      .then(
      function(connection) {

        instance.logInfo("Connected");
        instance.connection = connection;

      /* Do something with the connection */
    });


  }


  performAction(action, payload) {

    // user wants to perform an input action
    if(action.startsWith('Input.')) {
      this.connection.run(action);
      return;
    }

    if(action === 'Application.SetVolume' && payload.val !== undefined) {
      this.connection.run('Application.SetVolume',Number(payload.val));
      return;
    }



    if(action === 'Application.SetMute') {
      this.connection.run('Application.SetMute',payload.val);//Application.SetMute(false);
    }

  }
}

exports.XbmcBackendHandler = XbmcBackendHandler;