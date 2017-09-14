/**
 * Handles all the gui websocket stuff
 */
class WebSocketGuiHandler {

  constructor(panelsBuilder) {

    this.socket = io();

    this.panelsBuilder = panelsBuilder;

    this.panelsBuilder.setWebSocketHandler(this);

    const instance = this;

    /**
     * The backend sended the configuration of node mote
     */
    this.socket.on('config', function(msg) {
      instance.panelsBuilder.buildSideNav(msg);

      instance.getPanels(msg.defaultView.type, msg.defaultView.id);
    });

    /**
     * When we got some new panels redraw the panels
     */
    this.socket.on('panels', function(msg) {
      instance.panelsBuilder.buildNewPanels(msg);
    });

    /**
     * When we get a new state of a backend
     */
    this.socket.on('backendState', function(data) {
      instance.panelsBuilder.handleBackendState(data);
    });
  }


  /**
   * Emits the backend action event over the websocket
   * @param backendName the name of the backend to call
   * @param action the action to perform on the backend
   * @param payload payload for the given action like volume etc...
   */
  callBackendAction(backendName, action, payload) {

    navigator.vibrate(100);

    this.socket.emit('backendAction', {
      backendName: backendName,
      action: action,
      payload: payload
    });
  }

  /**
   * Gets the panels for the given type name and panelName
   * @param type the type to get can be backend or activity
   * @param name the name of the backend or activity
   * @param panelName the name of the panel to get can be undefined
   */
  getPanels(type, name, panelName) {
    this.socket.emit('getPanels', {
      type: type,
      name: name,
      panelName: panelName
    });
  }

  /**
   * Calls the backend to get the states for the given backendIds
   * @param backendIds
   */
  getStates(backendIds) {
    this.socket.emit('getStates', {
      backendIds : backendIds
    });
  }

}