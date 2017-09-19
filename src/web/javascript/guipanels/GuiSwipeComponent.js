class GuiSwipeComponent extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let componentObj = $('<div class="swipe blue-grey darken-1"></div>');

    const instance = this;

    $(componentObj).hammer({recognizers: [[Hammer.Tap], [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]]}).bind("swipeleft swiperight swipeup swipedown tap", function(e) {

      let backendName = $(this).data('componentCfg').backendId;
      let actionData = $(this).data('componentCfg')[e.type];

      instance.websocketHandler.callBackendAction(backendName, actionData.action, {val: actionData.value});

      return true;
    });


    return componentObj;
  }
}