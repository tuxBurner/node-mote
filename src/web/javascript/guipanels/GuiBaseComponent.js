/**
 * Bas Component which handles the basics for a gui component
 */
class GuiBaseComponent {

  /**
   * Constructor for the component
   * @param componentCfg the cfg of the component
   */
  constructor(componentCfg,websocketHandler){

    // the configuration of the component
    this.cfg = componentCfg;

    // the websocket handler for sending data
    this.websocketHandler = websocketHandler;

    // the actual component of this object
    this.component = null;
  }

  /**
   * Returns the component which is displayed at the frontend as jquery onject
   * @return {null}
   */
  getComponent() {
    this._addBackendData();

    return this.component;
  }

  /**
   * Renders the html of the component and returns the jquery object.
   *
   * @return {*|jQuery|HTMLElement}
   */
  buildHtmlComponent() {
    console.error(this.constructor.name + ': Implement me ! : ' + this.buildHtmlComponent.name);
  }


  /**
   * Adds general backend data information to the component
   * @private
   */
  _addBackendData() {

    if(this.component === null) {
      return;
    }

    $(this.component)
      .addClass('backendComponent');
  }

}