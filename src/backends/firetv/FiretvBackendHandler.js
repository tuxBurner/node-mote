const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for the amazon firetv
 * https://bitbucket.org/webgyver/node-rc6/src/8d220b0e04de2de69e5d1772da60e1857de22d9f/lib/adb-shell.js?at=master&fileviewer=file-view-default
 * https://github.com/soef/iobroker.firetv/blob/master/firetv.js
 * https://github.com/appium/appium-adb
 */
class FiretvBackendHandler extends BaseBackendHandler {
  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.logDebug('Loading ' + backendName, settings);
    this.exec = require('child_process').exec;


    this.connected = false;

  }


  /**
   * Gets the current state from firetv and sends it to the frontend
   */
  getState() {

  }


  performAction(action, payload) {
    if(action == 'Input') {
      this._execAdbShell('input keyevent '+payload.val);
    }
  }

  /**
   * Executes a cmd on the adb shell
   * @param cmd
   * @private
   */
  _execAdbShell(cmd) {
    let shell_cmd = (this.connected === false ? this.settings.config.adbPath+ ' connect ' + this.settings.config.host + ' && ' : '') + this.settings.config.adbPath + ' shell ' + cmd;

    this.logInfo('adb shell ' + cmd, shell_cmd);

    const instance = this;
    
    this.exec(shell_cmd, function(error, stdout, stderr) {

      instance.connected = true;

      instance.logDebug(stdout, { cmd: shell_cmd });

      if (instance.connected === true && error !== null || stderr !== '') {
        instance.logDebug('reconnect', { cmd: shell_cmd, error: error.message||error||'', stderr: stderr });
        instance.logInfo('reconnect', { cmd: shell_cmd });
        instance._execAdbShell(shell_cmd);
      } else if (error !== null) {
        instance.logError(error, { cmd: shell_cmd, stderr: stderr });
      } else if (stderr !== '') {
        instance.logError(stderr, { cmd: shell_cmd });
      }
    });
  }
}

exports.FiretvBackendHandler = FiretvBackendHandler;