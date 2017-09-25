class GuiSelectComponent extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let returnObj = $('<div class="input-field"></div>');

    let componentObj = $('<select></select>');


    for(let idx in this.cfg.values) {
      $(componentObj).append('<option value="' + componentCfg.values[idx] + '">' + componentCfg.values[idx] + '</option>');
    }

    const instance = this;


    $(componentObj).on('change', function() {
      let value = $(this).val();
      instance.websocketHandler.callBackendAction(this.cfg.backendId, this.cfg.action, {val: value});
    });

    $(returnObj).append(componentObj);

    let labelObj = $('<label>' + this.cfg.txt + '</label>');
    $(returnObj).append(labelObj);


    return returnObj;
  }
}