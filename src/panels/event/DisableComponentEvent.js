const {BaseComponentEvent} = require('./BaseComponentEvent');

/**
 * This is the event which is used to disable a component
 */
class DisableComponentEvent extends BaseComponentEvent {


  /**
   * This event is used when  a component shoud be disabled
   * @param keyToListen
   * @param valuesToDisableOn
   */
  constructor(keyToListen, valuesToDisableOn) {
    super('disableOn');
    this.keyToListen = keyToListen;
    this.valuesToDisableOn = valuesToDisableOn;
  }
}

exports.DisableComponentEvent = DisableComponentEvent;