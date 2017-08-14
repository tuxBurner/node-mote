/**
 * This is an event the component reacts on
 */
class BaseComponentEvent {

  constructor(type) {
    /**
     * The type of the event.
     * Can be for example showOn, updateOn ....
     */
    this.type = type;
  }


}

exports.BaseComponentEvent = BaseComponentEvent;