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
  getAllActivities() {
    let result = {};
    for(let idx in this.activities) {
      result[idx] = 'activity';
    }
    
    return result;
  }

  /**
   * Gets al panels for the given activity
   */
  getPanelsForActivity(activityId) {

    this.logDebug("User wants panels for activity: ",activityId);
    let activity = this.activities[activityId];

    let panelToReturn = {
      backendIds: activity.devices,
      panelCfg: activity.panel
    };

    return panelToReturn;
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