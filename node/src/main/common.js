
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

function getInstance(services, name) {
    var service = services[name];
    if (!service) {
        return null;
    }

    if (service.length === 0) {
        return null;
    }

    var instance = service[0];

    if (!instance) {
        return null;
    }

    return instance;
}

module.exports = {
    parse : parse,
    getInstance : getInstance
};
