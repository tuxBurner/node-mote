#!/bin/bash
echo "Starting nodeMote via nodemon";
export DEBUG=nodeMote;
node_modules/.bin/nodemon --ignore modules/web/assets nodeMote.js;

