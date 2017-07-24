const {BaseClass} = require('./BaseClass');

/**
 * Base class all backend's should extend from
 */
class BaseBackendHandler extends BaseClass {

  constructor(backendName, settings, baseDir) {
    super();

    this.backendName = backendName;
    this.settings = settings;

    this.panelsSetup = require(baseDir + "/panels.json");

    this.logDebug("Panels loaded: ", this.panelsSetup);
  }

  /**
   * Gets the panel with the given name
   * @param panelName
   */
  getPanelByName(panelName) {

    if(panelName === undefined) {
      panelName = this.getDefaultPanelName();
    }

    let panelToReturn = {
      backendName: this.backendName,
      panelCfg: this.panelsSetup[panelName]
    }

    return panelToReturn;
  }

  /**
   * Return the default panels for this backend
   */
  getDefaultPanelName() {
    this.logError("Implement me: " + this.getDefaultPanelName.name);
  }

  /**
   * Handles the given action on the backend
   * @param action
   * @param payload
   */
  performAction(action,payload) {
    this.logError("Implement me: " + this.performAction.name);
  }


  /**
   * Gets the type of the backend
   */
  getType() {
    return this.settings.type;
  }
}

exports.BaseBackendHandler = BaseBackendHandler;