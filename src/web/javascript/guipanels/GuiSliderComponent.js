class GuiSliderComponent extends GuiColumnComponent {
    
  _buildInnerHtmlComponent() {
    let componentObj = $('<div><i class="material-icons left">' + this.cfg.icon + '</i><label>' + this.cfg.txt + ': <output id="APIDConKpVal"></output></label></div>');
    let inputWrapperObj = $('<p class="range-field"></p>');


    let inputObj = $('<input type="range" min="' + this.cfg.min + '" max="' + this.cfg.max + '" step="' + this.cfg.step + '"/>');

    // handle change value event on the slider
    const instance = this;
    $(inputObj).on('input', function() {
      let backendName = instance.cfg.backendId;
      let action = instance.cfg.action;
      let rangeVal = $(this).val();
      // TODO FIX THIS
      $('#APIDConKpVal').val($(this).val());
      instance.websocketHandler.callBackendAction(backendName, action, {val: rangeVal});
    });

    $(inputWrapperObj).append(inputObj);
    $(componentObj).append(inputWrapperObj);

    // the input obj is the main component for events here
    this.eventComponent = inputObj;

    return componentObj;
  }

  _handleUpdateValueEvent(cfgEventObj, stateData) {
    super._handleUpdateValueEvent(cfgEventObj, stateData);
    let valToDisplay = stateData[cfgEventObj.keyToListen];
    $('#APIDConKpVal').val(valToDisplay);
  }
}