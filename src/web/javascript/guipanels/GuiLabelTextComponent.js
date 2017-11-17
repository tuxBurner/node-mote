class GuiLabelTextComponent extends GuiColumnComponent {

  _buildInnerHtmlComponent() {


    this.textComp = $(`<span></span>`);


    let html = `<div><b>${this.cfg.lblTxt}</b></div>`;


    let componentObj = $(html);
    componentObj.append(this.textComp);

    return componentObj;
  }

  _handleUpdateValueEvent(cfgEventObj, stateData) {

    let splittedKey = cfgEventObj.keyToListen.split('.');
    let valToDisplay = stateData;
    splittedKey.forEach(function(key) {
      if(valToDisplay === undefined) {
        valToDisplay = '';
      }
      valToDisplay = valToDisplay[key];
    });

    this.textComp.text(valToDisplay);
  }
}