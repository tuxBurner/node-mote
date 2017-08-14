const {BaseComponentEvent} = require('./BaseComponentEvent');

/**
 * This is the event which is used to hide or show a component
 */
class ShowOnComponentEvent extends BaseComponentEvent {


  /**
   * This event is used a component is only suppose to show when the given key has one of the given values
   * @param keyToListen
   * @param valuesToShowOn
   */
  constructor(keyToListen, valuesToShowOn) {
    super('shownOn');
    this.keyToListen = keyToListen;
    this.valuesToShowOn = valuesToShowOn;
  }
}

exports.ShowOnComponentEvent = ShowOnComponentEvent;