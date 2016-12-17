
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'push-reappt',
        'reappt',
        ['host', 'principal', 'credentials'])
};
