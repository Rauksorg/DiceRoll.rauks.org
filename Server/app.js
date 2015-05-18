"use strict";

var compression = require('compression'),
    express = require("express"),
    app = express(),
    oneYear = 31557600000;

app.use(compression());

app.use(express.static('../Client', { maxAge: oneYear }));
app.listen(process.env.PORT, process.env.IP);