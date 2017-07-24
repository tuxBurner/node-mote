const {BaseClass} = require('./BaseClass');

/**
 * Registry for the backends.
 * It tries to load the backends by there type and stores them in a map
 */
class BackendRegistry extends BaseClass {

  constructor() {
    super();

    /**
     * The loaded backends
     * @type {{}}
     */
    this.backends = {};

    // iterate over the backend's and instantiate them
    for(let backendName in this.settings.devices) {
      this._loadBackend(backendName, this.settings.devices[backendName]);
    }
  }

  /**
   * This is called when the user connects to the webserver
   */
  getAllBackends() {
    var result = {};
    for(let idx in this.backends) {
      result[idx] = this.backends[idx].getType();
    }

    return result;
  }

  /**
   * Gets the given panel from the given backend
   * @param backendName
   * @param panelToGet
   */
  getPanelsForBackend(backendName, panelToGet) {
    return this.backends[backendName].getPanelByName(panelToGet);
  }

  /**
   * Perform an action on the backend
   * @param backendName
   * @param action
   * @param payload
   */
  performActionOnBackend(backendName,action,payload) {
    this.backends[backendName].performAction(action, payload);
  }

  /**
   * Loads the backend by its settings and adds it to the backends var
   * @param backendName
   * @param settings
   * @private
   */
  _loadBackend(backendName, settings) {
    this.logInfo('Loading backend: ' + backendName + ' type: ' + settings.type);

    const backendHandlerClassName = this._capitalize(settings.type) + 'BackendHandler';
    const pathToClassFile = '../backends/' + settings.type + '/' + backendHandlerClassName;

    this.logDebug('Loading backend with: ' + pathToClassFile);

    const classToLoad = require(pathToClassFile);


    this.backends[backendName] = new classToLoad[backendHandlerClassName](backendName, settings)
  }

  /**
   * Sigh capitalize the first letter of the given String
   * @param s
   * @returns {string}
   * @private
   */
  _capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

}

module.exports = new BackendRegistry();