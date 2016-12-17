
'use strict';

function Parser() {
    this.name = 'reappt';

    this.parse = function parse(services) {
        var reappt = services['push-reappt'];
        if (!reappt) {
            return null;
        }

        if (reappt.length === 0) {
            return null;
        }

        var instance = reappt[0];

        if (!instance) {
            return null;
        }

        var details = instance.credentials;

        if (!details || !details.host || !details.principal || !details.credentials) {
            return null;
        }

        return {
            host : details.host,
            principal : details.principal,
            credentials : details.credentials
        };
    };
}

module.exports = {
    Parser : Parser
};
