class GuiSelectComponent extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let returnObj = $('<div class="input-field"></div>');

    let componentObj = $('<select></select>');


    for(let idx in this.cfg.values) {
      $(componentObj).append('<option value="' + this.cfg.values[idx] + '">' + this.cfg.values[idx] + '</option>');
    }

    const instance = this;

    this.eventComponent = componentObj;

    $(componentObj).on('change', function() {
      let value = $(this).val();
      instance.websocketHandler.callBackendAction(instance.cfg.backendId, instance.cfg.action, {val: value});
    });


    $(returnObj).append(componentObj);

    let labelObj = $('<label>' + this.cfg.txt + '</label>');
    $(returnObj).append(labelObj);


    return returnObj;
  }

  _handleUpdateValueEvent(cfgEventObj, stateData) {
    super._handleUpdateValueEvent(cfgEventObj, stateData);
    $(this.eventComponent).material_select();
  }
}