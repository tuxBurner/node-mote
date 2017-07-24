/**
 * Class which handles the panel building
 */
class GuiPanelsBuilder {

  constructor() {

  }

  /**
   * Builds the new panels from the given panelscfg
   * @param cfg
   */
  buildNewPanels(cfg) {


    var html = '';

    let backendName = cfg.backendName;
    let panelCfg = cfg.panelCfg;

    // iterate over the rows
    for(let rowIdx in panelCfg.rows) {

      html += '<div class="row">';

      let col = 12 / panelCfg.rows[rowIdx].length;

      for(let colIdx in panelCfg.rows[rowIdx]) {

        html += '<div class="col s' + col + '">';

        let panelContentCfg = panelCfg.rows[rowIdx][colIdx];
        switch(panelContentCfg.type) {
          case 'none' :
            break;
          case 'abtn' :
            html += this._buildActionBtnHtml(panelContentCfg, backendName);
            break;
          default :
            console.error('No panel entrance for the type: ' + panelContentCfg.type + ' found');
        }
        html += '</div>';
      }

      html += '</div>';
    }

    $('#panel_content').html(html);
  }

  /**
   * Builds a button with the given cfg
   * @param btnCfg
   * @private
   */
  _buildActionBtnHtml(btnCfg, backendName) {
    return '<a data-backend-name="' + backendName + '" data-backend-action="' + btnCfg.action + '" class="waves-effect waves-light btn-large"><i class="material-icons left">' + btnCfg.icon + '</i>' + btnCfg.txt + '</a>';
  }

}