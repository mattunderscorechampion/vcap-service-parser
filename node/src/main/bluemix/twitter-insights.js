
'use strict';

var common = require('./../common');

function Parser() {
    this.name = 'twitter-insights';

    this.parse = function parse(services) {
        var instance = common.getInstance(services, 'twitterinsights');
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
        result.port = details.port;
        result.host = details.host;

        return result;
    };
}

module.exports = {
    Parser : Parser
};
