"use strict";

var compression = require('compression'),
    express = require("express"),
    app = express(),
    oneYear = 31557600000;

app.use(compression());

app.use(express.static(__dirname +'/Client'));

// To activate caching
// app.use(express.static('Client', { maxAge: oneYear }));

// Catch all route
// app.use(function(req, res){
//       res.sendFile(__dirname + '/Client/index.html');
//   });
   
app.listen(process.env.PORT, process.env.IP);