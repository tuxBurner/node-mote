const {BaseBackendHandler} = require('../../lib/BaseBackendHandler');

/**
 * Handler for lirc
 * http://lirc.sourceforge.net/remotes/samsung/
 */
class LircBackendHandler extends BaseBackendHandler {

  constructor(backendName, settings) {

    super(backendName, settings, __dirname);

    this.lirCommandHandler = require('./LircCommandHandler');
  }


  /**
   * Gets the current state from firetv and sends it to the frontend
   */
  getState() {

  }


  performAction(action, payload) {
    this.lirCommandHandler.executeCommand(this.settings.config.remote, action);
  }

}

exports.LircBackendHandler = LircBackendHandler;