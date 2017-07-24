const {BaseClass} = require('./BaseClass');

class Webserver extends BaseClass {

  constructor() {
    super();

    this.logInfo('Starting');

    const express = require('express');
    this.expApp = require('express')();
    this.http = require('http').Server(this.expApp);
    this.socketIo = require('socket.io')(this.http);

    this.backendRegistry = require('./BackendRegistry');

    const instance = this;

    this._initWebSocketHandler();
    this._declareExpressUses(express);

    // start the web server
    this.http.listen(this.settings.WEBSERVER_PORT, function() {
      instance.logInfo('listens on *:' + instance.settings.WEBSERVER_PORT);
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

    /*this.expApp.use('/templates', express.static(__dirname+'/html/templates'));
    this.expApp.use('/jquery', express.static('./node_modules/jquery/dist'));
    this.expApp.use('/block-ui', express.static('./node_modules/block-ui'));
    this.expApp.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
    this.expApp.use('/assets', express.static(__dirname + '/assets'));*/
  }

  /**
   * Init the websocket handler stuff
   * @private
   */
  _initWebSocketHandler() {

    const instance = this;

    // a user connected to the websocket
    this.socketIo.on('connection', function(socket) {
      instance.logInfo('Websocket: A user connected');

      let avaibleBackends = instance.backendRegistry.getAllBackends();

      let configToSend = {
        backends: avaibleBackends
      };

      instance.socketIo.emit('config', configToSend);

      // user disconnected
      socket.on('disconnect', function() {
        instance.logInfo('Websocket: A user disconnected');
      });


      // perform an action on the backend
      socket.on('backendAction',function(msg) {
        instance.logDebug('User wants to perform an action: ', msg);
        instance.backendRegistry.performActionOnBackend(msg.backendName,msg.action,msg.payload);
      });

      // Gets the panels for the given stuff
      socket.on('getPanels', function(msg) {
        instance.logDebug('User wants panels cfg: ', msg);

        var panelsCfg = undefined;

        // get the panels for the given backend
        if(msg.type === 'backend') {
          panelsCfg = instance.backendRegistry.getPanelsForBackend(msg.name, msg.panelName);
        }

        instance.logDebug('Found panels cfg: ', panelsCfg);
        socket.emit('panels', panelsCfg);
      });

      // a backend message arrived we have to tell the backend to do something :)
      socket.on('backendMessage', function(msg) {
        instance.logDebug('backendMessage received: ', msg);
      });

    });
  }

}

module.exports = new Webserver();