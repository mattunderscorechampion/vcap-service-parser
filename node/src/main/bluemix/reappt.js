
'use strict';

var common = require('./../common');

function Parser() {
    this.name = 'reappt';

    this.parse = function parse(services) {
        var instance = common.getInstance(services, 'push-reappt');
        if (!instance) {
            return null;
        }

        var details = instance.credentials;

        if (!details || !details.host || !details.principal || !details.credentials) {
            return null;
        }

        var result = common.parse(instance);
        result.host = details.host;
        result.principal = details.principal;
        result.credentials = details.credentials;

        return result;
    };
}

module.exports = {
    Parser : Parser
};
