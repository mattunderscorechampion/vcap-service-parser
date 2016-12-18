
'use strict';

var vcapParser = require('./vcap-parser'),
    bluemix = require('./bluemix/bluemix');

module.exports = {
    Parser : vcapParser.Parser,
    bluemix : bluemix.plugins
};
