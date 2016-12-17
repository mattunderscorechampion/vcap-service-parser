
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'AvailabilityMonitoring',
        'monitoring',
        ['url', 'id', 'pass'])
};
