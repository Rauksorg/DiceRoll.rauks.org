"use strict";
var express = require("express"),
    app = express();
app.use(express.static('../Client'));
app.listen(process.env.PORT, process.env.IP);