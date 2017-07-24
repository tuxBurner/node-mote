const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for xbmc/kodi backends
 * Using libary: https://github.com/martinverup/node-kodi
 */
class XbmcBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);

    let kodiRpc = require('node-kodi');

    this.kodiRpc = new kodiRpc({
      url: this.settings.config.host,
      user: this.settings.config.user,
      password: this.settings.config.pass
    });

    this.settings = settings;
  }

  

  performAction(action, payload) {

    // user wants to perform an input action
    if(action.startsWith('Input.')) {
      this.kodiRpc.rpc(action)
      return;
    }

    /*switch(action) {
      case 'Input.up' :
        //this.kodiRpc.input.up();
        this.kodiRpc.rpc('Input.Back')
        break;
      default:
        this.logError("Cannot perform action: " + action, payload);
    } */

  }
}

exports.XbmcBackendHandler = XbmcBackendHandler;