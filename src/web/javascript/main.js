$(function() {

  const panelsBuilder = new GuiPanelsBuilder();
  // init the websocket gui handler
  const websocketHandler = new WebSocketGuiHandler(panelsBuilder);


  $('.button-collapse').sideNav();
});