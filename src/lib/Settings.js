/**
 * Holds the settings off the application
 */
class Settings {
  constructor() {
    //General
    this.DEBUG_LEVEL = 'debug';

    /**
     * Load the config json
     */
    let userCfg = require('../../config.json');

    this.WEBSERVER_PORT = userCfg.webserver.port || 3000;

    this.devices = userCfg.devices;
    this.activities = userCfg.activities;
    this.defaultView = userCfg.defaultView;
  }
}

module.exports = new Settings();
