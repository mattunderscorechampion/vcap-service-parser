
'use strict';

var unknown = require('./unknown-service-plugin');

function Parser(plugins) {
    function filterPluginsForServices(availablePlugins, serviceNames) {
        return availablePlugins.filter(function (plugin) {
            return serviceNames.findIndex(function (serviceName) {
                    return plugin.name === serviceName;
                }) !== -1;
        });
    }

    function selectPlugins(serviceNames, unknownServices) {
        var availablePlugins = plugins.concat(unknownServices);

        if (typeof serviceNames === 'string') {
            return filterPluginsForServices(availablePlugins, [serviceNames]);
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            return filterPluginsForServices(availablePlugins, serviceNames);
        }
        return availablePlugins;
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

    function isKnownService(serviceName) {
        return plugins.findIndex(function (plugin) {
            return plugin.selector === serviceName;
        }) === -1;
    }

    function createPluginsForUnknownServices(services) {
        var unknownServicePlugins = [];
        availableServices(services).forEach(function(service) {
            if (isKnownService(service)) {
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
