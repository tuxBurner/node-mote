const {BaseClass} = require('./BaseClass');

/**
 * Base class all backend's should extend from
 */
class BaseBackendHandler extends BaseClass {

  constructor(backendName, settings, baseDir) {
    super();

    this.backendName = backendName;
    this.settings = settings;

    this.panelsHandler = require(baseDir + "/BackendPanels.js");
  }

  /**
   * Gets the panel with the given name
   * @param {string} panelName the name of the panel
   */
  getPanelByName(panelName) {

    if(panelName === undefined) {
      panelName = this.panelsHandler.getDefaultPanelName();
    }

    let panelToReturn = {
      backendName: this.backendName,
      panelCfg: this.panelsHandler.getPanelForFrontend(panelName)
    }

    return panelToReturn;
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
   * @return {string} the type of the backend
   */
  getType() {
    return this.settings.type;
  }
}

exports.BaseBackendHandler = BaseBackendHandler;