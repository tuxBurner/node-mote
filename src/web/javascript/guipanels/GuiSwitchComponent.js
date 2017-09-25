class GuiSwitchComponent extends GuiColumnComponent {
    
  _buildInnerHtmlComponent() {
    let componentObj = $('<div><i class="material-icons left">' + this.cfg.icon + '</i></div>');

    let switchWrapperObj = $('<div class="switch"></div>');

    let switchLabelObj = $('<label>' + this.cfg.txt + '</label>');

    let inputObj = $('<input type="checkbox" data-off-val="' + this.cfg.firstVal + '" data-on-val="' + this.cfg.secondVal + '" >');

    const instance = this;
    $(inputObj).on('change', function() {

      let checked = $(this).prop('checked');
      let valToSet = (checked === true) ? instance.cfg.secondVal : instance.cfg.firstVal;
      let action = instance.cfg.action;
      instance.websocketHandler.callBackendAction(instance.cfg.backendId, action, {val: valToSet});
    });

    $(switchLabelObj).append(inputObj);
    $(switchLabelObj).append('<span class="lever"></span>' + this.cfg.txt2);
    $(switchWrapperObj).append(switchLabelObj);
    $(componentObj).append(switchWrapperObj);

    this.eventComponent = inputObj;

    return componentObj;
  }

  _handleUpdateValueEvent(cfgEventObj, stateData) {
    let checked = this.cfg.secondVal === stateData[cfgEventObj.keyToListen];
    $(this.eventComponent).prop('checked', checked);
  }

  
}