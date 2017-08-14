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


    let parent = $('#panel_content');
    $(parent).empty();
    console.error(panelCfg.components);
    this._handleComponents(parent, backendName, panelCfg.components, 12);

    //let html = this._handleComponents(backendName, panelCfg.components, 12);
    //$('#panel_content').html(html);
    //this._registerEvenetsOnComponents();
  }


  /**
   * Handles the data which is send when the backend state changed
   * @param stateData
   */
  handleBackendState(stateData) {
    // get all components which match the backend name
    let backendComponents = $('[data-backend-name="' + stateData.backendName + '"]')
  }


  /**
   * Handles the components of a sub component
   * @param parent
   * @param backendName
   * @param components
   * @param col
   * @private
   */
  _handleComponents(parent, backendName, components, col) {
    for(let idx in components) {
      let component = components[idx];
      this._handleComponent(parent, backendName, component, col);
    }
  }

  /**
   * Handles a single gui component
   * @param parent
   * @param backendName
   * @param component
   * @param col
   * @private
   */
  _handleComponent(parent, backendName, component, col) {

    // the generated component dom obj
    let componentObj = null;

    switch(component.type) {
      case 'row' :
        componentObj = this._buildRow(backendName, component);
        break;
      case 'panel' :
        componentObj = this._buildPanel(backendName, col, component);
        break;
      case 'abutton' :
        componentObj = this._buildCol(col, this._buildActionBtn(component, backendName));
        break;
      case 'slider' :
        componentObj = this._buildCol(col, this._buildSlider(component, backendName));
        break;
      case 'switch' :
        componentObj = this._buildCol(col, this._buildSwitch(component, backendName));
        break;
      case 'swipe' :
        componentObj = this._buildCol(col, this._buildSwipe(component, backendName));
        break;
    }


    $(parent).append(componentObj);
  }

  _buildRow(backendName, component) {
    let newCol = 12 / component.components.length;
    let html = '<div class="row">';
    html += '</div>';
    let componentObj = $(html);

    // add the sub component objects to the gui
    this._handleComponents(componentObj, backendName, component.components, newCol);

    return componentObj;
  }

  _buildPanel(backendName, col, component) {
    let componentObj = this._buildCol(col);

    this._handleComponents(componentObj, backendName, component.components, col);

    return componentObj;
  }

  _buildCol(col, innerComponent) {
    let html = '<div class="col s' + col + '">';
    html += '</div>';
    let componentObj = $(html);

    if(innerComponent !== undefined) {
      $(componentObj).append(innerComponent);
    }

    return componentObj;
  }

  _addBackendData(componentObj, componentCfg, backendName) {
    $(componentObj).data('backendName', backendName);
    if(componentCfg.action !== undefined) {
      $(componentObj).data('backendAction', componentCfg.action);
    }
  }


  /**
   *  Builds a simple action button
   * @param componentCfg
   * @param col
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildActionBtn(componentCfg, backendName) {

    let html = '<a class="waves-effect waves-light btn-large"><i class="material-icons left">' + componentCfg.icon + '</i>' + componentCfg.txt + '</a>';

    let componentObj = $(html);

    $(componentObj).data('value', componentCfg.value);
    this._addBackendData(componentObj, componentCfg, backendName);

    const instance = this;

    $(componentObj).on('click', function() {
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');
      let value = $(this).data('value');

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    return componentObj;
  }

  /**
   * Builds a slider
   * @param componentCfg
   * @param backendName
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSlider(componentCfg, backendName) {
    let componentObj = $('<div><i class="material-icons left">' + componentCfg.icon + '</i><label>' + componentCfg.txt + '</label></div>');
    let inputWrapperObj = $('<p class="range-field"></p>');


    let inputObj = $('<input type="range" min="' + componentCfg.min + '" max="' + componentCfg.max + '" step="' + componentCfg.step + '"/>');
    this._addBackendData(inputObj, componentCfg, backendName);

    const instance = this;
    $(inputObj).on('change', function() {
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');
      let rangeVal = $(this).val();
      instance.websocketHandler.callBackendAction(backendName, action, {val: rangeVal});
    });


    $(inputWrapperObj).append(inputObj);
    $(componentObj).append(inputWrapperObj);
    return componentObj;
  }


  /**
   * Builds a switch
   *
   * @param componentCfg
   * @param backendName
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSwitch(componentCfg, backendName) {

    let componentObj = $('<div><i class="material-icons left">' + componentCfg.icon + '</i></div>');

    let switchWrapperObj = $('<div class="switch"></div>');

    let switchLabelObj = $('<label>' + componentCfg.txt + '</label>')

    let inputObj = $('<input type="checkbox" data-off-val="' + componentCfg.firstVal + '" data-on-val="' + componentCfg.secondVal + '" >');
    this._addBackendData(inputObj, componentCfg, backendName);
    $(inputObj).data('offVal', componentCfg.firstVal);
    $(inputObj).data('onVal', componentCfg.secondVal);

    const instance = this;
    $(inputObj).on('change', function() {
      let checked = $(this).prop('checked');
      let valToSet = (checked === true) ? $(this).data('onVal') : $(this).data('offVal');
      let backendName = $(this).data('backendName');
      let action = $(this).data('backendAction');
      instance.websocketHandler.callBackendAction(backendName, action, {val: valToSet});
    });

    $(switchLabelObj).append(inputObj);
    $(switchLabelObj).append('<span class="lever"></span>' + componentCfg.txt2);
    $(switchWrapperObj).append(switchLabelObj);
    $(componentObj).append(switchWrapperObj);


    return componentObj;
  }

  /**
   * Builds a swipe input
   * @param componentCfg
   * @param backendName
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSwipe(componentCfg, backendName) {


    let componentObj = $('<div class="swipe blue-grey darken-1"></div>');
    this._addBackendData(componentObj, componentCfg, backendName);

    $(componentObj)
      .data('swipeleft', componentCfg.leftAction)
      .data('swiperight', componentCfg.rightAction)
      .data('swipedown', componentCfg.downAction)
      .data('swipeup', componentCfg.upAction)
      .data('tap',componentCfg.tapAction);


    const instance = this;

    $(componentObj).hammer({recognizers: [[Hammer.Tap], [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]]}).bind("swipeleft swiperight swipeup swipedown tap", function(e) {
      let backendName = $(this).data('backendName');

      let actionData = $(this).data(e.type);

      instance.websocketHandler.callBackendAction(backendName, actionData.action, {val: actionData.value});

      return true;
    });


    return componentObj;
  }

}
