const {BaseClass} = require('./BaseClass');

class BaseBackendPanelHandler extends BaseClass {

  constructor(backend) {
    super();

    this.backend = backend;
    this.backendId = backend.backendName;

    this.panels = {};
    this.defaultPanelName = '';
  }

  /**
   * Adds the default panel to the handler
   * @param {Panel} panel the panel to add as default panel
   * @private
   */
  _addDefaultPanel(panel) {
    this.logInfo('Default panel is: '+panel.name);
    this.defaultPanelName = panel.name;
    this._addPanel(panel);
  }

  /**
   * Adds a panel to the handler
   * @param {Panel} panel the panel to add
   * @private
   */
  _addPanel(panel) {
    this.panels[panel.name] = panel;
  }

  /**
   * Returns the default panel name
   * @return {string} the name of the default panel
   */
  getDefaultPanelName() {
    return this.defaultPanelName;
  }

  /**
   * Gets the panel by the given panelName
   * @param {string} panelName the name of the panel
   * @returns {Panel} the panel for the given name
   */
  getPanelForFrontend(panelName) {
    if(this.panels[panelName] === undefined) {
      this.logError('Cannot find panel: '+panelName);
      return null;
    }

    return this.panels[panelName];
  }

}

exports.BaseBackendPanelHandler = BaseBackendPanelHandler;