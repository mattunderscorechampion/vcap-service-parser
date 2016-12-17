
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'cloudantNoSQLDB',
        'cloudant',
        ['host', 'port', 'url', 'username', 'password'])
};
