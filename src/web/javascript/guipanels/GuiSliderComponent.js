class GuiSliderComponent extends GuiColumnComponent {
    
  _buildInnerHtmlComponent() {
    let componentObj = $('<div><i class="material-icons left">' + this.cfg.icon + '</i><label>' + this.cfg.txt + ': <output id="APIDConKpVal"></output></label></div>');
    let inputWrapperObj = $('<p class="range-field"></p>');


    let inputObj = $('<input type="range" min="' + this.cfg.min + '" max="' + this.cfg.max + '" step="' + this.cfg.step + '"/>');

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
    return componentObj;
  }
}