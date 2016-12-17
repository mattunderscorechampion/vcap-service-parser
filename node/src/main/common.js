
'use strict';

function parse(service) {
    if (!service) {
        return {};
    }

    var result = {};
    if (service.name) {
        result.name = service.name;
    }

    if (service.plan) {
        result.plan = service.plan;
    }

    if (service.tags) {
        result.tags = service.tags;
    }

    return result;
}

module.exports = {
    parse : parse
};
