
'use strict';

var common = require('./common');

function Parser(selector) {
    this.name = selector;
    this.selector = selector;

    this.parse = function parse(services) {
        var instance = common.getInstance(services, selector);
        if (!instance) {
            return null;
        }

        var details = instance.credentials;

        if (!details) {
            return null;
        }

        var result = common.parse(instance);

        for (var property in details) {
            if (details.hasOwnProperty(property)) {
                result[property] = details[property];
            }
        }

        return result;
    };
}

module.exports = {
    Parser : Parser
};
