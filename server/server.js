'use strict';
// Importing required modules
const cors = require('cors');

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');

// parse env variables
require('dotenv').config();

// Configuring port
const serverPort = process.env.PORT || 9000;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
// Configure middlewares
app.use(cors());

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
module.exports = app;
