$(function() {
    
  const panelsBuilder = new GuiPanelsBuilder();
  // init the websocket gui handler
  const websocketHandler = new WebSocketGuiHandler(panelsBuilder);

  /**
   * Listen on all events for buttons
   */
  $(document).on('click','.btn-large',function() {
    let backendName = $(this).data('backendName');
    let action = $(this).data('backendAction');

    websocketHandler.callBackendAction(backendName,action);
  });

  /**
   * List for all range changes
   */
  $(document).on('change','[type="range"]',function() {
    let backendName = $(this).data('backendName');
    let action = $(this).data('backendAction');
    let rangeVal = $(this).val();

    websocketHandler.callBackendAction(backendName,action,{val: rangeVal});
  });

  $('.button-collapse').sideNav();
});