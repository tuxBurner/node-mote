$(function() {

  const panelsBuilder = new GuiPanelsBuilder();
  // init the websocket gui handler
  const websocketHandler = new WebSocketGuiHandler(panelsBuilder);


  // register the modals
  $('.modal').modal();


  $('.leftSideNavBtn').sideNav();
});
