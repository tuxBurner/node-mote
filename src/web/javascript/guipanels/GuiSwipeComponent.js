class GuiSwipeComponent extends GuiColumnComponent {

  _buildInnerHtmlComponent() {
    let componentObj = $('<div class="swipe blue-grey darken-1"></div>');

    const instance = this;

    $(componentObj)
      .hammer({recognizers: [[Hammer.Tap], [Hammer.Press], [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL, threshold: 5, velocity: 0.1}]]})
      .bind("swipeleft swiperight swipeup swipedown press tap", function(e) {

        console.error(e);

      let backendName = instance.cfg.backendId;
      let actionData = instance.cfg[e.type];

      instance.websocketHandler.callBackendAction(backendName, actionData.action, {val: actionData.value});

      return true;
    });


    return componentObj;
  }
}