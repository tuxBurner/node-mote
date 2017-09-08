const {BaseClass} = require('./BaseClass');
const {Activity} = require('./Activity');

/**
 * Registry for the activities.
 * It tries to load the activities and holds them in a map
 */
class ActivitiesRegistry extends BaseClass {

  constructor() {
    super();

    /**
     * The loaded activities
     * @type {{}}
     */
    this.activities = {};

    // iterate over the backend's and instantiate them
    for(let activityId in this.settings.activities) {
      this._loadActivity(activityId, this.settings.activities[activityId]);
    }
  }

  /**
   * This is called when the user connects to the webserver
   */
  getAllBackends() {
    let result = {};
    for(let idx in this.backends) {
      result[idx] = this.backends[idx].getType();
    }

    return result;
  }



  /**
   * Loads the activity by its settings and adds it to the activities var
   * @param activityId
   * @param settings
   * @private
   */
  _loadActivity(activityId, settings) {
    this.logInfo('Loading activity: ' + activityId);

    this.activities[activityId] = new Activity(activityId,settings)
  }

}

module.exports = new ActivitiesRegistry();