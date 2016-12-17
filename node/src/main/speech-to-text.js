
'use strict';

var common = require('./common');

function Parser() {
    this.name = 'speech-to-text';

    this.parse = function parse(services) {
        var speechToText = services.speech_to_text;
        if (!speechToText) {
            return null;
        }

        if (speechToText.length === 0) {
            return null;
        }

        var instance = speechToText[0];

        if (!instance) {
            return null;
        }

        var details = instance.credentials;

        if (!details || !details.url || !details.username || !details.password) {
            return null;
        }

        var result = common.parse(instance);
        result.url = details.url;
        result.username = details.username;
        result.password = details.password;

        return result;
    };
}

module.exports = {
    Parser : Parser
};
