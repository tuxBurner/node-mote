const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for the amazon firetv
 * https://bitbucket.org/webgyver/node-rc6/src/8d220b0e04de2de69e5d1772da60e1857de22d9f/lib/adb-shell.js?at=master&fileviewer=file-view-default
 */
class FireTvBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);
    this.exec = 


  }


  /**
   * Gets the current state from firetv and sends it to the frontend
   */
  getState() {


  }


  performAction(action, payload) {

  }
}

exports.FireTvBackendHandler = FireTvBackendHandler;