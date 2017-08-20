const {BaseClass} = require('../../lib/BaseClass');

class LircCommandHandler extends BaseClass {

  constructor() {
    super();

    this.lirc = require('lirc-client')({
      path: '/var/run/lirc/lircd'
    });
  }

  executeCommand(remote, key) {
    this.logDebug('Executing lirc: ' + remote + ' ' + key);

    const instance = this;

    this.lirc.cmd('SEND_ONCE', remote, key, function(err) {
      if(err) {
        instance.logError("An error happened calling lirc: ",err);
      }
    });

  }

}

module.exports = new LircCommandHandler();