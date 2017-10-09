/**
 * A simple panel component, which can contain other panels or action components
 */
class GuiPanelComponent extends GuiColumnComponent {

  /**
   *
   * @param componentCfg
   * @param columnNumber
   * @param websocketHandler
   * @param innerHtmlCallback this call back generates the inner html of the panel
   */
  constructor(componentCfg, columnNumber, websocketHandler, innerHtmlCallback) {
    super(componentCfg, columnNumber, websocketHandler);
    this.innerHtmlCallBack = innerHtmlCallback;
  }

  getComponent() {
    const instance = this;
    $.each(this.cfg.components, function (idx, subComponent) {
      instance.innerHtmlCallBack(instance.columnComponent, subComponent, instance.columnNumber);
    });

    //$(this.columnComponent).append(innerComponents);
    super.getComponent();
  }

  _buildInnerHtmlComponent() {
    return null;
  }
}