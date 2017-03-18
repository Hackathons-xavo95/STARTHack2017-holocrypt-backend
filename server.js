"use strict";

// Load environment variables defined at '.env' file
require('dotenv').config();

var app = require("./server/application");

// Start the server
var port = process.env.PORT;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
