const {BaseComponentEvent} = require('./BaseComponentEvent');

/**
 * This is the event which is used to hide or show  a component when a certain state occurs
 */
class HideComponentEvent extends BaseComponentEvent {


  /**
   * This event is used when  a component should be hidden
   * @param keyToListen
   * @param valuesToHideOn
   */
  constructor(keyToListen, valuesToHideOn) {
    super('hideOn');
    this.keyToListen = keyToListen;
    this.valuesToHideOn = valuesToHideOn;
  }
}

exports.HideComponentEvent = HideComponentEvent;