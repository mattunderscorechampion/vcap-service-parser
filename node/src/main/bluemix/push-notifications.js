
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'imfpush',
        'push-notifications',
        ['url', 'admin_url', 'appSecret'])
};
