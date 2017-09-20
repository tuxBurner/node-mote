class GuiActionButton extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let html = '<a class="waves-effect waves-light btn"><i class="material-icons left">' + this.cfg.icon + '</i>' + this.cfg.txt + '</a>';

    let componentObj = $(html);

    const instance = this;

    $(componentObj).on('click', function() {
      let backendName = instance.cfg.backendId;
      let action = instance.cfg.action;
      let value = instance.cfg.value;

      instance.websocketHandler.callBackendAction(backendName, action, {val: value});
    });

    return componentObj;
  }
}