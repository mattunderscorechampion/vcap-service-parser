
'use strict';

var generic = require('./../generic-plugin');

module.exports = {
    Parser : generic.Parser.bind(
        null,
        'speech_to_text',
        'speech-to-text',
        ['url', 'username', 'password'])
};
