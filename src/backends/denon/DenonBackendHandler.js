const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for the denon avrs
 * https://github.com/lmoe/node-denon-client
 */
class DenonBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);

    const Denon = require('denon-client');

    this.denonClient = new Denon.DenonClient(this.settings.config.host);

    this.denonClient.connect();
  }


  /**
   * Gets the current state from firetv and sends it to the frontend
   */
  getState() {

  }


  performAction(action, payload) {

    // user wants to power the denon avr
    if(action === 'POWER') {
      this.denonClient.setPower('ON');
      return;
    }

    if(action === 'SETVOLUME') {
      this.denonClient.setVolume(payload.val);
      return;
    }

    if(action === 'SETINPUT') {
      this.denonClient.setInput(payload.val);
      return;
    }

    if(action === 'SETSURROUND') {
      this.denonClient.setSurround(payload.val);
      return;
    }

    if(action === 'SETMUTE') {
      this.denonClient.setMute(payload.val);
      return;
    }



  }


}

exports.DenonBackendHandler = DenonBackendHandler;