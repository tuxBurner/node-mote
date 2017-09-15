const {BaseClass} = require('./BaseClass');

class Webserver extends BaseClass {

  constructor() {
    super();

    this.logInfo('Starting');

    const express = require('express');
    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);

    this.eventHandler = require('./EventHandler');

    this.backendRegistry = require('./BackendRegistry');
    this.activityRegistry = require('./ActivitiesRegistry');

    const instance = this;

    this._initWebSocketHandler();
    this._declareExpressUses(express);

    // start the web server
    this.http.listen(this.settings.WEBSERVER_PORT, function () {
      instance.logInfo('listens on *:' + instance.settings.WEBSERVER_PORT);
    });

    this.eventHandler.registerOnBackendDataChange(function (data) {
      instance.sendBackendState(data);
    });
  }

  /**
   * Some express use path setup.
   * @private
   */
  _declareExpressUses(express) {

    /**
     * the main html
     */
    /*this.expApp.get('/', function(req, res) {
      res.sendFile(__dirname + '/../web/html/index.html');
    });*/


    this.expApp.use('/', express.static(__dirname + '/../web'));
    this.expApp.use('/materialize', express.static('./node_modules/materialize-css/dist'));

  }

  /**
   * Init the websocket handler stuff
   * @private
   */
  _initWebSocketHandler() {

    const instance = this;

    // a user connected to the websocket
    this.socketIo.on('connection', function (socket) {

      instance.logInfo('Websocket: A user connected');

      let avaibleBackends = instance.backendRegistry.getAllBackends();
      let avaibleActivities = instance.activityRegistry.getAllActivities()


      let configToSend = {
        backends: avaibleBackends,
        activities: avaibleActivities,
        defaultView: instance.settings.defaultView
      };

      instance.logDebug("Sending config data to user: ",configToSend);

      instance.socketIo.emit('config', configToSend);

      // user disconnected
      socket.on('disconnect', function () {
        instance.logInfo('Websocket: A user disconnected');
      });


      // perform an action on the backend
      socket.on('backendAction', function (msg) {
        instance.logDebug('User wants to perform an action: ', msg);
        instance.backendRegistry.performActionOnBackend(msg.backendName, msg.action, msg.payload);
      });

      // Gets the panels for the given stuff
      socket.on('getPanels', function (msg) {
        let panels = instance._getFrontendPanels(msg);
        //instance.logDebug('Found panels cfg: ', panelsCfg);
        socket.emit('panels', panels);
      });


      /**
       * Get the states for the given backends
       */
      socket.on('getStates', function (msg) {
        instance.logDebug('User wants backend states: ', msg);
        for (let idx in msg.backendIds) {
          instance.backendRegistry.getStateForBackend(msg.backendIds[idx]);
        }
      });

      // a backend message arrived we have to tell the backend to do something :)
      socket.on('backendMessage', function (msg) {
        instance.logDebug('backendMessage received: ', msg);
      });

    });
  }

  /**
   * Gets the panels for the given type and id
   * @param msg the message from the frontend containing the id and the type
   * @return {undefined}
   * @private
   */
  _getFrontendPanels(msg) {
    this.logDebug('User wants panels cfg: ', msg);

    var panelsCfg = undefined;

    // get the panels for the given backend
    if (msg.type === 'backend') {
      panelsCfg = this.backendRegistry.getPanelsForBackend(msg.name, msg.panelName);
      panelsCfg.backendIds = [msg.name];
    }

    if (msg.type === 'activity') {
      panelsCfg = this.activityRegistry.getPanelsForActivity(msg.name);
    }

    panelsCfg.type = msg.type;
    panelsCfg.id = msg.name;

    return panelsCfg;
  }

  /**
   * Sends the state of the backend to the web frontend
   * @param payload the data to send
   */
  sendBackendState(payload) {
    this.logDebug('Sending state data for backend: ' + payload.backendName, payload.data);

    this.socketIo.emit('backendState', payload);
  }

}

module.exports = new Webserver();