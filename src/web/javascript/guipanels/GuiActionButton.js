class GuiActionButton extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let html = '<a class="waves-effect waves-light btn"><i class="material-icons left">' + this.cfg.icon + '</i>' + this.cfg.txt + '</a>';

    let componentObj = $(html);

    const instance = this;

    $(componentObj).on('click', function() {
      let backendName = $(this).data('componentCfg').backendId;
      let action = $(this).data('componentCfg').action;
      let value = $(this).data('componentCfg').value;

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    return componentObj;
  }
}