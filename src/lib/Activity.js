const {BaseClass} = require('./BaseClass');

const {Panel} = require('../panels/Panel');
const {Row} = require('../panels/Row');

/**
 * This class represents an activity where multiple backends are configured
 */
class Activity extends BaseClass {

  constructor(id, activitySettings) {
    super();

    this.id = id;
    this.backendRegistry = require('./BackendRegistry');

    this.logInfo(this.id + " loaded with settings: ", activitySettings);

    // main panel of the activity
    this.panel = new Panel('none','none');
    this.devices = [];

    this._buildPanels(activitySettings);
  }

  /**
   * Builds the panels for this activity
   * @private
   */
  _buildPanels(settings) {

    for(let rowIdx in settings.panels) {

      let rowPanels = [];

      for(let colIdx in settings.panels[rowIdx]) {
        let devicePanelName = settings.panels[rowIdx][colIdx];
        let split = devicePanelName.split('.');
        let devicePanelCfg = this.backendRegistry.getPanelsForBackend(split[0],split[1]);

        // add the device of the panel to the devices if not there
        if(this.devices.indexOf(split[0]) === -1) {
          this.devices.push(split[0]);
        }
        // get the panelcfg
        rowPanels.push(devicePanelCfg.panelCfg);
      }

      this.panel.addRow(rowPanels);
    }
  }
}

exports.Activity = Activity;