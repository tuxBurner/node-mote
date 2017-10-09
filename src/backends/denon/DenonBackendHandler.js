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

    // stores the current powerstate
    this.currentState = {
      input: undefined,
      mute: undefined,
      power: undefined,
      surround: undefined,
      volume: undefined,

    };

    // marks that the backend is getting the state already
    this.getttingState = false;

    const instance = this;

    // listen to power change
    this.denonClient.on('powerChanged', (power) => {
      if (instance.currentState.power !== power) {
        instance.currentState.power = power;
        instance.getState();
      }
    });

    // listen to volume change
    this.denonClient.on('masterVolumeChanged', (volume) => {
      if (instance.currentState.volume !== volume) {
        instance.getState();
      }
    });

    // listen to mute change
    this.denonClient.on('muteChanged', (mute) => {
      if (instance.currentState.mute !== mute) {
        instance.getState();
      }
    });

    // listen to input change
    this.denonClient.on('inputChanged', (input) => {
      if (instance.currentState.input !== input) {
        instance.getState();
      }
    });


  }


  /**
   * Gets the current state from firetv and sends it to the frontend
   */
  getState() {

    this.logDebug('Getting state for denon: ' + this.backendName);

    let promises = [];
    promises.push(this.denonClient.getPower());

    if (this.currentState.power === 'ON') {
      promises.push(this.denonClient.getInput());
      promises.push(this.denonClient.getMute());
      promises.push(this.denonClient.getSurround());
      promises.push(this.denonClient.getVolume());
    }


    const instance = this;

    Promise.all(promises)
      .then(([power,
               input,
               mute,
               surround,
               volume
             ]) => {
          instance.currentState = {
            input: input,
            mute: mute,
            power: power,
            surround: surround,
            volume: volume
          };

          instance.logInfo('Got state from denon: ' + instance.backendName, this.currentState);

          instance.emitBackendState(this.currentState);
        }
      )
    ;
  }


  performAction(action, payload) {

    // user wants to power the denon avr
    if (action === 'POWER') {
      this.denonClient.setPower('ON');
      return;
    }

    if (action === 'SETVOLUME') {
      this.denonClient.setVolume(payload.val);
      return;
    }

    if (action === 'SETINPUT') {
      this.denonClient.setInput(payload.val);
      return;
    }

    if (action === 'SETSURROUND') {
      this.denonClient.setSurround(payload.val);
      return;
    }

    if (action === 'SETMUTE') {
      this.denonClient.setMute(payload.val);
      return;
    }


  }


}

exports.DenonBackendHandler = DenonBackendHandler;