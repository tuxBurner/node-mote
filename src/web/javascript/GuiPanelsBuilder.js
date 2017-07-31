/**
 * Class which handles the panel building
 */
class GuiPanelsBuilder {

  constructor() {
    this.websocketHandler = null;
  }

  setWebSocketHandler(handler) {
    this.websocketHandler = handler;
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

    this._registerEvenetsOnComponents();

  }

  _registerEvenetsOnComponents() {

    const instance = this;

    /**
     * Listen on all events for buttons
     */
    $('.btn-large').on('click', function() {
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');
      let value = $(this).data('value');

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    /**
     * Listen for all range changes
     */
    $('[type="range"]').on('change', function() {
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');
      let rangeVal = $(this).val();

      instance.websocketHandler.callBackendAction(backendName, action, {val: rangeVal});
    });

    /**
     * Listen on all checkbox changes
     */
    $(':checkbox').on('change', function() {
      let checked = $(this).prop('checked');
      let valToSet = (checked === true) ? $(this).data('onVal') : $(this).data('offVal');
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');

      instance.websocketHandler.callBackendAction(backendName, action, {val: valToSet});
    });

    $('.swipe').hammer({recognizers: [[Hammer.Tap],[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]]}).bind("swipeleft swiperight swipeup swipedown tap", function(e) {
      let backendName = $(this).data('backendName');
      let action = $(this).data(e.type + 'Action');
      let value = $(this).data(e.type + 'Val');

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});

      return true;
    });
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

    const instance = this;

    switch(component.type) {
      case 'panel' :
        html += this._buildCol(col, function() {
          return instance._handleComponents(backendName, component.components, col);
        });
        break;
      case 'row' :
        let newCol = 12 / component.components.length;
        html += '<div class="row">';
        html += this._handleComponents(backendName, component.components, newCol);
        html += '</div>';
        break;
      case 'abutton' :
        html += this._buildCol(col, function() {
          return instance._buildActionBtnHtml(backendName, component);
        });
        break;
      case 'slider' :
        html += this._buildCol(col, function() {
          return instance._buildSliderHtml(backendName, component);
        });
        break;
      case 'switch' :
        html += this._buildCol(col, function() {
          return instance._buildSwitchHtml(backendName, component);
        });
        break;

      case 'swipe' :
        html += this._buildCol(col, function() {
          return instance._buildSwipeHtml(backendName, component);
        });
        break;
    }

    return html;
  }

  _buildCol(col, elementHtmlFunc) {
    let html = '<div class="col s' + col + '">';
    html += elementHtmlFunc();
    html += '</div>';

    return html;
  }


  /**
   * Builds a simple action button
   * @param backendName
   * @param componentCfg
   * @return {string}
   * @private
   */
  _buildActionBtnHtml(backendName, componentCfg) {
    return '<a data-backend-name="' + backendName + '" data-backend-action="' + componentCfg.action + '" data-value="' + componentCfg.value + '" class="waves-effect waves-light btn-large"><i class="material-icons left">' + componentCfg.icon + '</i>' + componentCfg.txt + '</a>';
  }

  /**
   * Builds a slider
   * @param backendName
   * @param componentCfg
   * @return {string}
   * @private
   */
  _buildSliderHtml(backendName, componentCfg) {
    let html = '<i class="material-icons left">' + componentCfg.icon + '</i><label>' + componentCfg.txt + '</label><p class="range-field">';
    html += '<input data-backend-name="' + backendName + '" data-backend-action="' + componentCfg.action + '"  type="range" min="' + componentCfg.min + '" max="' + componentCfg.max + '" step="' + componentCfg.step + '"/>';
    html += '</p>';

    return html;
  }

  /**
   * Builds a switch
   * @param backendName
   * @param componentCfg
   * @return {string}
   * @private
   */
  _buildSwitchHtml(backendName, componentCfg) {
    let html = '<i class="material-icons left">' + componentCfg.icon + '</i>';
    html += '<div class="switch">';
    html += '<label>' + componentCfg.txt;
    html += '<input type="checkbox" data-backend-name="' + backendName + '"  data-backend-action="' + componentCfg.action + '" data-off-val="' + componentCfg.firstVal + '" data-on-val="' + componentCfg.secondVal + '" >';
    html += '<span class="lever"></span>';
    html += componentCfg.txt2 + '</label>';
    html += '</div>';

    return html;
  }

  /**
   * Builds a swipe input
   * @param backendName
   * @param componentCfg
   * @return {string}
   * @private
   */
  _buildSwipeHtml(backendName, componentCfg) {

    console.error(componentCfg);
    let html = '<div class="swipe blue-grey darken-1" data-backend-name="' + backendName + '" ';

    html += 'data-swipeleft-action="' + componentCfg.leftAction.action + '"';
    html += 'data-swipeleft-val="' + componentCfg.leftAction.value + '"';

    html += 'data-swiperight-action="' + componentCfg.rightAction.action + '"';
    html += 'data-swiperight-val="' + componentCfg.rightAction.value + '"';

    html += 'data-swipeup-action="' + componentCfg.upAction.action + '"';
    html += 'data-swipeup-val="' + componentCfg.upAction.value + '"';

    html += 'data-swipedown-action="' + componentCfg.downAction.action + '"';
    html += 'data-swipedown-val="' + componentCfg.downAction.value + '"';

    html += 'data-tap-action="' + componentCfg.tapAction.action + '"';
    html += 'data-tap-val="' + componentCfg.tapAction.value + '"';

    html += '></div>';

    return html;
  }

}
