
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'twitterinsights',
        'twitter-insights',
        ['host', 'port', 'url', 'username', 'password'])
};
