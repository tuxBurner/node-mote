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


    let backendName = cfg.backendName;
    let panelCfg = cfg.panelCfg;

    let html = this._handleComponents(backendName, panelCfg.components, 12);


    $('#panel_content').html(html);
  }

  _handleComponents(backendName, components, col) {

    let html = '';

    for(let idx in components) {
      let component = components[idx];
      html += this._handleComponent(backendName, component, col);
    }

    return html;
  }

  _handleComponent(backendName, component, col) {

    let html = '';

    switch(component.type) {
      case 'panel' :
        html += this._handleComponents(backendName, component.components, col);
        break;
      case 'row' :
        let newCol = 12 / component.components.length;
        html += '<div class="row">';
        html += this._handleComponents(backendName, component.components,newCol);
        html += '</div>';
        break;
      case 'abutton' :
        //html += this._buildActionBtnHtml(backendName, component);
        const instance = this;
        html += this._buildCol(col,function() {
          return instance._buildActionBtnHtml(backendName, component);
        });
        break;
    }

    return html;
  }

  _buildCol(col,elementHtmlFunc) {
    let html = '<div class="col s' + col + '">';
    html += elementHtmlFunc();
    html += '</div>';

    return html;
  }


  _buildActionBtnHtml(backendName, btnCfg) {
    return '<a data-backend-name="' + backendName + '" data-backend-action="' + btnCfg.action + '" class="waves-effect waves-light btn-large"><i class="material-icons left">' + btnCfg.icon + '</i>' + btnCfg.txt + '</a>';
  }

}