const {BaseClass} = require('./BaseClass');

/**
 * This class represents an activity where multiple backends are configured
 */
class Activity extends BaseClass {

  constructor(id, activitySettings) {
    super();

    this.id = id;

    this.logInfo("Activity: " + this.id + " loaded with settings: ", activitySettings);
  }
}

exports.Activity = Activity;