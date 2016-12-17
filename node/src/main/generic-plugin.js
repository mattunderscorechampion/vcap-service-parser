
'use strict';

var common = require('./common');

function Parser(selector, name, fields) {
    this.name = name;

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

        fields.forEach(function (field) {
            if (details[field] !== undefined || details[field] !== null) {
                result[field] = details[field];
            }
        });

        return result;
    };
}

module.exports = {
    Parser : Parser
};
