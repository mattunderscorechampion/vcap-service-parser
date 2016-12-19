
'use strict';

var unknown = require('./unknown-service-plugin');

function Parser(plugins) {
    function filterPluginsForServices(serviceNames, unknownServices) {
        return plugins.concat(unknownServices).filter(function (plugin) {
            return serviceNames.findIndex(function (serviceName) {
                    return plugin.name === serviceName;
                }) !== -1;
        });
    }

    function filterPluginsForService(serviceNames, unknownServices) {
        return plugins.concat(unknownServices).filter(function (plugin) {
            return plugin.name === serviceNames;
        });
    }

    function selectPlugins(serviceNames, unknownServices) {
        if (typeof serviceNames === 'string') {
            return filterPluginsForService(serviceNames, unknownServices);
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            return filterPluginsForServices(serviceNames, unknownServices);
        }
        return plugins.concat(unknownServices);
    }

    function availableServices(services) {
        var available = [];
        for (var property in services) {
            if (services.hasOwnProperty(property)) {
                available.push(property);
            }
        }
        return available;
    }

    function createPluginsForUnknownServices(services) {
        var unknownServicePlugins = [];
        availableServices(services).forEach(function(service) {
            if (plugins.findIndex(function (plugin) {
                return plugin.selector === service;
            }) === -1) {
                unknownServicePlugins.push(new unknown.Parser(service));
            }
        });

        return unknownServicePlugins;
    }

    this.parse = function parse(services, serviceNames) {
        // Ensure the services are an object
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        // Select the plugins to parse with
        var unknownServices = createPluginsForUnknownServices(services);
        var selectedPlugins = selectPlugins(serviceNames, unknownServices);

        // Use the selected plugins to parse the service
        var result = {};
        selectedPlugins.forEach(function(plugin) {
            result[plugin.name] = plugin.parse(services);
        });

        return result;
    };

    this.resolveAll = function resolveAll() {
        return this.parse(process.env.VCAP_SERVICES, null);
    };

    this.resolve = function resolve(serviceNames) {
        return this.parse(process.env.VCAP_SERVICES, serviceNames);
    };
}

module.exports = {
    Parser : Parser
};
