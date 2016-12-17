
'use strict';

var common = require('./../common');

function Parser() {
    this.name = 'monitoring';

    this.parse = function parse(services) {
        var instance = common.getInstance(services, 'AvailabilityMonitoring');
        if (!instance) {
            return null;
        }

        var details = instance.credentials;

        if (!details || !details.url || !details.id || !details.pass) {
            return null;
        }

        var result = common.parse(instance);
        result.url = details.url;
        result.id = details.id;
        result.pass = details.pass;

        return result;
    };
}

module.exports = {
    Parser : Parser
};
