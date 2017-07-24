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

  getDefaultPanelName() {
    return 'main';
  }
}

exports.XbmcBackendHandler = XbmcBackendHandler;