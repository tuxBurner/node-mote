const {BaseClass} = require('./BaseClass');
const {EventEmitter} = require('events');

/**
 * A simple event handler for handling some events in the application
 */
class EventHandler extends  BaseClass {

  constructor() {
    super();

    this.eventEmitter = new EventEmitter();
  }

  /**
   *
   * @param callback
   */
  registerOnBackendDataChange(callback) {
    // register the event listener
    this.eventEmitter.on('backendStateChanged', function(data) {
      callback(data);
    });
  }

  emitBackenDataChanged(backendName, stateData) {

    let payLoad = {
      backendName: backendName,
      data: stateData
    };

    this.eventEmitter.emit('backendStateChanged',payLoad);
  }

}

module.exports = new EventHandler();