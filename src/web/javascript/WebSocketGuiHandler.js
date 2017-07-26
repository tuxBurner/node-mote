/**
 * Handles all the gui websocket stuff
 */
class WebSocketGuiHandler {

  constructor(panelsBuilder) {

    this.socket = io();

    this.panelsBuilder = panelsBuilder;

    this.panelsBuilder.setWebSocketHandler(this);

    const instance = this;

    this.socket.on('config', function(msg) {
      instance._buildSideNav(msg);

      instance._getPanels('backend','XBMC_LOCAL');
    });

    /**
     * When we got some new panels redraw the panels
     */
    this.socket.on('panels', function(msg) {
      instance.panelsBuilder.buildNewPanels(msg);
    });
  }

  /**
   * Builds the left side navigation
   * @param data
   * @private
   */
  _buildSideNav(data) {
    var html = '<li><h6>Backends</h6></li>'
      + '<li><div class="divider"></div></li>';

    for(let idx in data.backends) {
      html += '<li><a href="#!">' + idx + '</a></li>';
    }

    $('#left-slide-nav').html(html);
  }

  /**
   * Emits the backend action event over the websocket
   * @param backendName the name of the backend to call
   * @param action the action to perform on the backend
   * @param payload payload for the given action like volume etc...
   */
  callBackendAction(backendName,action,payload) {
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
   * @private
   */
  _getPanels(type,name,panelName) {
    this.socket.emit('getPanels', {
      type: type,
      name: name,
      panelName: panelName
    });
  }

}