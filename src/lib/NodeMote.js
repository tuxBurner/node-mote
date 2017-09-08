const {BaseClass} = require('./BaseClass');

/**
 * This class handles the 'main' loop
 */
class NodeMote extends BaseClass {
  constructor() {
    super();

    this.logInfo('Starting System');

    this.backendRegistry = require('./BackendRegistry');
    this.activitiesRegistry = require('./ActivitiesRegistry');
    this.webServer = require('./Webserver');


  }
}

module.exports = new NodeMote();