const {BaseComponentEvent} = require('./BaseComponentEvent');

/**
 * This is the event which is used to hide or show a component
 */
class UpdateValueComponentEvent extends BaseComponentEvent {


  /**
   * This event is used a component is to update  its value when the given 
   * @param keyToListen
   * @param value
   */
  constructor(keyToListen) {
    super('updateValue');
    this.keyToListen = keyToListen;
  }
}

exports.UpdateValueComponentEvent = UpdateValueComponentEvent;