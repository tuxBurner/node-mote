/**
 * The Gui Column Component
 */
class GuiColumnComponent extends GuiBaseComponent {

  constructor(componentCfg, columnNumber, websocketHandler) {
    super(componentCfg, websocketHandler);

    //how many columns does this column has in css
    this.columnNumber = columnNumber;

    // stores the column component
    this.columnComponent = null;
  }

  getComponent() {
    return this.columnComponent;
  }

  /**
   * Renders the html component
   */
  buildHtmlComponent() {
    let html = '<div class="col center-align s' + this.columnNumber + '">';
    html += '</div>';
    let componentObj = $(html);

    this.component = this._buildInnerHtmlComponent();
    if(this.component) {
      this._addBackendData();
      $(componentObj).append(this.component);
    }

    this.columnComponent = componentObj;
  }

  _buildInnerHtmlComponent() {
    console.error(this.constructor.name + ': Implement me ! : ' + this.buildInnerHtmlComponent.name);
    return null;
  }
}