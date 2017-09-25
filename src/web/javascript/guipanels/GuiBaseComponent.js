/**
 * Bas Component which handles the basics for a gui component
 */
class GuiBaseComponent {

  /**
   * Constructor for the component
   * @param componentCfg the cfg of the component
   */
  constructor(componentCfg, websocketHandler) {

    // the configuration of the component
    this.cfg = componentCfg;

    // the websocket handler for sending data
    this.websocketHandler = websocketHandler;

    // the actual component of this object
    this.component = null;

    // the component the events are supposed to register on
    this.eventComponent = null;

    this._intialized = false;
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
   * Implement this if the component is reacting on a value event
   * @param cfgEventObj the event configuration of this component
   * @param stateData the state data from the backend
   * @private
   */
  _handleUpdateValueEvent(cfgEventObj, stateData) {
    $(this.eventComponent).val(stateData[cfgEventObj.keyToListen]);
  }

  /**
   * Implement this if the component is suppose to be disabled
   * @param cfgEventObj the event configuration of this component
   * @param stateData the state data from the backend
   * @private
   */
  _handleDisableEvent(cfgEventObj, stateData) {
    let currentBackendState = stateData[cfgEventObj.keyToListen];
    let disable = ($.inArray(currentBackendState, cfgEventObj.valuesToDisableOn) !== -1);
    $(this.eventComponent).prop("disabled", disable);
  }


  /**
   * Adds general backend data information to the component
   * @private
   */
  _addBackendData() {

    if(this.component === null || this._intialized === true) {
      return;
    }

    // normally the event component is the main component
    if(this.eventComponent === null) {
      this.eventComponent = this.component;
    }

    this._intialized = true;

    // add the class which is required to register the events
    $(this.eventComponent).addClass('backendComponent');

    // register events if there are some configured
    if(this.cfg.events.length !== 0 && this.eventComponent !== null) {

      const instance = this;

      $(this.eventComponent).on('backendStateChanged' + this.cfg.backendId, function(e, stateData) {


        $.each(instance.cfg.events, function(idx, compEvent) {

          if(compEvent.type === 'updateValue') {
            instance._handleUpdateValueEvent(compEvent, stateData)
          }

          if(compEvent.type === 'disableOn') {
            instance._handleDisableEvent(compEvent, stateData);
          }
        });
      });
    }
  }

}