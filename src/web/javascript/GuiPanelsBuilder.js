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
   * builds the side navigation on the left side
   * @param data
   */
  buildSideNav(data) {
    let parent = $('#left-slide-nav');
    $(parent).empty();

    if(data.activities !== undefined) {
      $(parent).append('<li><h6>Activities</h6></li><li><div class="divider"></div></li>');
      this._buildSideNavPoints(parent, 'activity', data.activities);
    }

    if(data.backends !== undefined) {
      $(parent).append('<li><h6>Backends</h6></li><li><div class="divider"></div></li>');
      this._buildSideNavPoints(parent, 'backend', data.backends);
    }
  }


  /**
   * Builds the side nav points of the given type
   * @param {element} parent
   * @param {string} type
   * @param {mixed} navPoints
   * @private
   */
  _buildSideNavPoints(parent, type, navPoints) {

    const instance = this;

    for(let idx in navPoints) {

      let navPoint = $('<a class="nmNavPoint" href="#!">' + idx + '</a>');
      $(navPoint)
        .data('type', type)
        .data('id', idx)
        .on('click', function(e) {
          let type = $(this).data('type');
          let name = $(this).data('id');
          $('.leftSideNavBtn').sideNav('hide');
          instance.websocketHandler.getPanels(type, name)
        });

      $(parent).append($('<li></li>').append(navPoint));
    }
  }

  /**
   * Builds the new panels from the given panels cfg
   * and set some other meta data in the gui about the currently selected
   * state.
   * @param cfg
   */
  showNewState(cfg) {

    // display the name of the current state
    $('#currentStateNameDisplay').text(cfg.id);

    // mark the state as active in the menu
    $('.nmNavPoint').parent().removeClass('active');
    $('.nmNavPoint').each(function(idx,obj) {
      if($(obj).data('type') === cfg.type && $(obj).data('id') === cfg.id) {
         $(obj).parent().addClass('active');
      }
    });

    let panelCfg = cfg.panelCfg;

    let parent = $('#panel_content');
    $(parent).empty();
    this._handleComponents(parent, panelCfg.components, 12);

    // selects are handled special in materialize
    $('select').material_select();

    // gather the backend ids to get the states
    this.websocketHandler.getStates(cfg.backendIds);




      this._handleActivityStates(cfg);
  }


  /**
   * Handles the data which is send when the backend state changed
   * @param stateData
   */
  handleBackendState(stateData) {
    $('.backendComponent').trigger('backendStateChanged' + stateData.backendName, stateData.data);
  }


  /**
   * Handles the components of a sub component
   * @param parent
   * @param components
   * @param col
   * @private
   */
  _handleComponents(parent, components, col) {
    const instance = this;
    $.each(components, function(idx, component) {
      instance._handleComponent(parent, component, col);
    });
  }

  /**
   * Handles a single gui component
   * @param parent
   * @param component
   * @param col
   * @private
   */
  _handleComponent(parent, component, col) {

    // the generated component dom obj
    let componentObj = null;

    switch(component.type) {
      case 'row' :
        componentObj = this._buildRow(component);
        break;
      case 'panel' :
        componentObj = this._buildPanel(col, component);
        break;
      case 'abutton' :
        componentObj = this._buildCol(col, this._buildActionBtn(component));
        break;
      case 'slider' :
        componentObj = this._buildCol(col, this._buildSlider(component));
        break;
      case 'switch' :
        componentObj = this._buildCol(col, this._buildSwitch(component));
        break;
      case 'swipe' :
        componentObj = this._buildCol(col, this._buildSwipe(component));
        break;
      case 'select' :
        componentObj = this._buildCol(col, this._buildSelect(component));
        break;
    }


    $(parent).append(componentObj);
  }

  /**
   * Builds a row and add the sub components to it
   * @param component
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildRow(component) {
    let newCol = 12 / component.components.length;
    let html = '<div class="row">';
    html += '</div>';
    let componentObj = $(html);

    // add the sub component objects to the gui
    this._handleComponents(componentObj, component.components, newCol);

    return componentObj;
  }

  /**
   * Builds a panel
   * @param col
   * @param component
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildPanel(col, component) {
    let componentObj = this._buildCol(col);

    this._handleComponents(componentObj, component.components, col);

    return componentObj;
  }

  /**
   * Builds a column div when given the innerComponent is added as a child to it
   * @param col
   * @param innerComponent
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildCol(col, innerComponent) {
    let html = '<div class="col center-align s' + col + '">';
    html += '</div>';
    let componentObj = $(html);

    if(innerComponent !== undefined) {
      $(componentObj).append(innerComponent);
    }

    return componentObj;
  }

  /**
   * Adds general backend data information to the component
   * @param componentObj
   * @param componentCfg
   * @private
   */
  _addBackendData(componentObj, componentCfg) {
    $(componentObj)
      .data('componentCfg', componentCfg)
      .addClass('backendComponent');
  }


  /**
   *  Builds a simple action button
   * @param componentCfg
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildActionBtn(componentCfg) {

    let html = '<a class="waves-effect waves-light btn"><i class="material-icons left">' + componentCfg.icon + '</i>' + componentCfg.txt + '</a>';

    let componentObj = $(html);

    this._addBackendData(componentObj, componentCfg);

    const instance = this;

    $(componentObj).on('click', function() {
      let backendName = $(this).data('componentCfg').backendId;
      let action = $(this).data('componentCfg').action;
      let value = $(this).data('componentCfg').value;

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    return componentObj;
  }

  /**
   * Builds a slider
   * @param componentCfg
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSlider(componentCfg) {
    let componentObj = $('<div><i class="material-icons left">' + componentCfg.icon + '</i><label>' + componentCfg.txt + ': <output id="APIDConKpVal"></output></label></div>');
    let inputWrapperObj = $('<p class="range-field"></p>');


    let inputObj = $('<input type="range" min="' + componentCfg.min + '" max="' + componentCfg.max + '" step="' + componentCfg.step + '"/>');
    this._addBackendData(inputObj, componentCfg);

    const instance = this;
    $(inputObj).on('input', function() {
      let backendName = $(this).data('componentCfg').backendId;
      let action = $(this).data('componentCfg').action;
      let rangeVal = $(this).val();
      $(APIDConKpVal).val($(this).val());
      instance.websocketHandler.callBackendAction(backendName, action, {val: rangeVal});
    });

    if(componentCfg.events.length !== 0) {
      $(inputObj).on('backendStateChanged' + componentCfg.backendId, function(e, stateData) {
        let componentCfg = $(this).data('componentCfg');

        $.each(componentCfg.events, function(idx, compEvent) {
          if(compEvent.type === 'updateValue') {
            $(e.target).val(stateData[compEvent.keyToListen]);
          }

          if(compEvent.type === 'disableOn') {
            let currentBackendState = stateData[compEvent.keyToListen];
            let disable = ($.inArray(currentBackendState, compEvent.valuesToDisableOn) !== -1);
            $(e.target).prop("disabled", disable);
          }
        });

      });
    }

    $(inputWrapperObj).append(inputObj);
    $(componentObj).append(inputWrapperObj);
    return componentObj;
  }


  /**
   * Builds a switch
   *
   * @param componentCfg
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSwitch(componentCfg) {

    let componentObj = $('<div><i class="material-icons left">' + componentCfg.icon + '</i></div>');

    let switchWrapperObj = $('<div class="switch"></div>');

    let switchLabelObj = $('<label>' + componentCfg.txt + '</label>');

    let inputObj = $('<input type="checkbox" data-off-val="' + componentCfg.firstVal + '" data-on-val="' + componentCfg.secondVal + '" >');
    this._addBackendData(inputObj, componentCfg);

    const instance = this;
    $(inputObj).on('change', function() {

      let checked = $(this).prop('checked');
      let componentCfg = $(this).data('componentCfg');
      let valToSet = (checked === true) ? componentCfg.secondVal : componentCfg.firstVal;
      let backendName = $(this).data('componentCfg').backendId;
      let action = componentCfg.action;
      instance.websocketHandler.callBackendAction(backendName, action, {val: valToSet});
    });

    if(componentCfg.events.length !== 0) {
      $(inputObj).on('backendStateChanged' + componentCfg.backendId, function(e, stateData) {
        let componentCfg = $(this).data('componentCfg');

        $.each(componentCfg.events, function(idx, compEvent) {
          if(compEvent.type === 'updateValue') {
            let checked = componentCfg.secondVal === stateData[compEvent.keyToListen];
            $(e.target).prop('checked', checked);
          }
        });

      });
    }

    $(switchLabelObj).append(inputObj);
    $(switchLabelObj).append('<span class="lever"></span>' + componentCfg.txt2);
    $(switchWrapperObj).append(switchLabelObj);
    $(componentObj).append(switchWrapperObj);


    return componentObj;
  }

  /**
   * Builds a select input
   * @param componentCfg
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSelect(componentCfg) {


    let returnObj = $('<div class="input-field"></div>');

    let componentObj = $('<select></select>');
    this._addBackendData(componentObj, componentCfg);

    for(let idx in componentCfg.values) {
      $(componentObj).append('<option value="' + componentCfg.values[idx] + '">' + componentCfg.values[idx] + '</option>');
    }

    const instance = this;

    // TODO: this is the same as button
    $(componentObj).on('change', function() {
      let backendName = $(this).data('componentCfg').backendId;
      let action = $(this).data('componentCfg').action;
      let value = $(this).val();

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    $(returnObj).append(componentObj);

    let labelObj = $('<label>' + componentCfg.txt + '</label>');
    $(returnObj).append(labelObj);


    return returnObj;
  }

  /**
   * Builds a swipe input
   * @param componentCfg
   * @return {*|jQuery|HTMLElement}
   * @private
   */
  _buildSwipe(componentCfg) {


    let componentObj = $('<div class="swipe blue-grey darken-1"></div>');
    this._addBackendData(componentObj, componentCfg);

    const instance = this;

    $(componentObj).hammer({recognizers: [[Hammer.Tap], [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]]}).bind("swipeleft swiperight swipeup swipedown tap", function(e) {

      let backendName = $(this).data('componentCfg').backendId;
      let actionData = $(this).data('componentCfg')[e.type];

      instance.websocketHandler.callBackendAction(backendName, actionData.action, {val: actionData.value});

      return true;
    });


    return componentObj;
  }

  /**
   * This handles the state to set on the backends
   * @param cfg
   * @private
   */
  _handleActivityStates(cfg) {

    // empty the list
    $('#activitySetStatesList').empty();

    if(cfg.type === 'activity') {
      $(cfg.states).each(function(backendId,state){
         console.error(state);
      });
    }

    $('#activityQuerstionModal').modal('open');


  }

}
