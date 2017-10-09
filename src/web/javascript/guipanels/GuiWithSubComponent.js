/**
 * A component creating new components from its childs
 */
class GuiWithSubComponent extends GuiBaseComponent {

  constructor(componentCfg, columnNumber, websocketHandler) {
    super(componentCfg, websocketHandler);

    this.columnNumber = columnNumber;

  }

  getComponent() {
    // before getting the component we want to build the sub components
    this._handleSubComponents();

    return super.getComponent();
  }

  /**
   * Goes through the sub components in the cfg and build them
   * @private
   */
  _handleSubComponents() {
    const instance = this;
    $.each(this.cfg.components, function (idx, component) {
      instance._handleComponent(component);
    });
  }

  /**
   * Handles a single gui component
   * @param subComponentCfg
   * @private
   */
  _handleComponent(subComponentCfg) {

    // the generated component dom obj
    let componentObj = null;

    let col = this.columnNumber;

    switch (subComponentCfg.type) {
      case 'row' :
        componentObj = this._buildRow(subComponentCfg);
        break;
      case 'panel' :
        let panel = new GuiPanelComponent(subComponentCfg, col, this.websocketHandler, this._handleComponent);
        componentObj = panel.getComponent();
        break;
      case 'abutton' :
        let guiButton = new GuiButtonComponent(subComponentCfg, col, this.websocketHandler);
        guiButton.buildHtmlComponent();
        componentObj = guiButton.getComponent();
        break;
      case 'slider' :
        let guiSlider = new GuiSliderComponent(subComponentCfg, col, this.websocketHandler);
        guiSlider.buildHtmlComponent();
        componentObj = guiSlider.getComponent();
        break;
      case 'switch' :
        let guiSwitch = new GuiSwitchComponent(subComponentCfg, col, this.websocketHandler);
        guiSwitch.buildHtmlComponent();
        componentObj = guiSwitch.getComponent();
        break;
      case 'swipe' :
        let swipe = new GuiSwipeComponent(subComponentCfg, col, this.websocketHandler);
        swipe.buildHtmlComponent()
        componentObj = swipe.getComponent();
        break;
      case 'select' :
        let guiSelect = new GuiSelectComponent(subComponentCfg, col, this.websocketHandler);
        guiSelect.buildHtmlComponent();
        componentObj = guiSelect.getComponent();
        break;
    }


    $(this.component).append(componentObj);
  }

}