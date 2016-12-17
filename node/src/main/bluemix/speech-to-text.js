
'use strict';

var common = require('./../common');

function Parser() {
    this.name = 'speech-to-text';

    this.parse = function parse(services) {
        var instance = common.getInstance(services, 'speech_to_text');
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
