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

    if (data.activities !== undefined) {
      $(parent).append('<li><h6>Activities</h6></li><li><div class="divider"></div></li>');
      this._buildSideNavPoints(parent, 'activity', data.activities);
    }

    if (data.backends !== undefined) {
      $(parent).append('<li><h6>Devices</h6></li><li><div class="divider"></div></li>');
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

    for (let idx in navPoints) {

      let navPoint = $('<a class="nmNavPoint" href="#!">' + idx + '</a>');
      $(navPoint)
        .data('type', type)
        .data('id', idx)
        .on('click', function (e) {
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
    $('.nmNavPoint').each(function (idx, obj) {
      if ($(obj).data('type') === cfg.type && $(obj).data('id') === cfg.id) {
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
    $.each(components, function (idx, component) {
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

    switch (component.type) {
      case 'row' :
        componentObj = this._buildRow(component);
        break;
      case 'panel' :
        componentObj = this._buildPanel(col, component);
        break;
      case 'abutton' :
        let guiButton = new GuiActionButton(component, col, this.websocketHandler);
        guiButton.buildHtmlComponent();
        componentObj = guiButton.getComponent();
        break;
      case 'slider' :
        let guiSlider = new GuiSliderComponent(component, col, this.websocketHandler);
        guiSlider.buildHtmlComponent();
        componentObj = guiSlider.getComponent();

        break;
      case 'switch' :
        let guiSwitch = new GuiSwitchComponent(component, col, this.websocketHandler);
        guiSwitch.buildHtmlComponent();
        componentObj = guiSwitch.getComponent();
        break;
      case 'swipe' :
        let swipe = new GuiSwipeComponent(component, col, this.websocketHandler);
        swipe.buildHtmlComponent()
        componentObj = swipe.getComponent();
        break;
      case 'select' :
        let guiSelect = new GuiSelectComponent(component, col, this.websocketHandler);
        guiSelect.buildHtmlComponent();
        componentObj = guiSelect.getComponent();
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

    if (innerComponent !== undefined) {
      $(componentObj).append(innerComponent);
    }

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


    if (cfg.type === 'activity') {

      let showModal = false;

      const instance = this;

      $(cfg.states).each(function (idx, backendStates) {
        let backendId = backendStates.backendId;
        $(backendStates.states).each(function (idx2, stateCfg) {
          if (stateCfg.question !== undefined) {
            showModal = true;
            let questionComp = $(`<a href="#!" class="collection-item">${stateCfg.question}</a>`);
            $(questionComp).data('stateCfg', stateCfg).data('backendId', backendId);

            questionComp.on('click', function () {
              let stateCfg = $(this).data('stateCfg');
              let backendId = $(this).data('backendId');
              instance.websocketHandler.callBackendAction(backendId, stateCfg.action, {val: stateCfg.payload});
            });
            $('#activitySetStatesList').append(questionComp);
          } else {
            instance.websocketHandler.callBackendAction(backendId, stateCfg.action, {val: stateCfg.payload});
          }

        });
      });

      if (showModal === true) {
        $('#activityQuerstionModal').modal('open');
      }
    }
  }

}
