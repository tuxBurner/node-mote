/**
 * A basic component doing an action
 */
class BaseComponent {

  constructor(backendId, type) {

    if(backendId === undefined) {
      throw new Error('backendId is not set');
    }

    /**
     * Type of the component
     */
    this.type = type;

    /**
     * The id of the backend this component belongs to
     */
    this.backendId = backendId;

    /**
     * Events the component reacts ons
     * @type {Array}
     */
    this.events = [];
  }

  getType() {
    return this.type;
  }

  /**
   * Adds an event to the component
   * @param  eventToAdd the event to add
   * @return {BaseComponent} the component itself
   */
  addEvent(eventToAdd) {
    this.events.push(eventToAdd);
    return this;
  }
}

exports.BaseComponent = BaseComponent;