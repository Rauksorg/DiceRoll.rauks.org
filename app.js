"use strict";

var compression = require('compression'),
    express = require("express"),
    app = express(),
    oneYear = 31557600000;

app.use(compression());

// No caching
app.use(express.static(__dirname + '/client'));

// With caching
// app.use(express.static('client', { maxAge: oneYear }));

// Catch all route
app.use(function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(process.env.PORT, process.env.IP);