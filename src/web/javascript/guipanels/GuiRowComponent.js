class GuiRowComponent extends GuiWithSubComponent {

  constructor(componentCfg, websocketHandler) {
    super(componentCfg,12,websocketHandler);
    this.columnNumber = 12 / this.cfg.components.length;
  }

  buildHtmlComponent() {
    this.component = $('<div class="row"></div>');
  }

}