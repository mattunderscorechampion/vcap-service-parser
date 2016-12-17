
'use strict';

var unknown = require('./unknown-service-plugin');

function Parser(plugins) {
    function filterPluginsForServices(serviceNames) {
        return plugins.filter(function (plugin) {
            return serviceNames.findIndex(function (serviceName) {
                    return plugin.name === serviceName;
                }) !== -1;
        });
    }

    function filterPluginsForService(serviceNames) {
        return plugins.filter(function (plugin) {
            return plugin.name === serviceNames;
        });
    }

    function selectPlugins(serviceNames) {
        if (typeof serviceNames === 'string') {
            return filterPluginsForService(serviceNames);
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            return filterPluginsForServices(serviceNames);
        }
        return plugins;
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

    this.parse = function parse(services, serviceNames, addUnknown) {
        // Ensure the services are an object
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        // Select the plugins to parse with
        var selectedPlugins = selectPlugins(serviceNames);
        if (addUnknown) {
            selectedPlugins = selectedPlugins.concat(createPluginsForUnknownServices(services));
        }

        // Use the selected plugins to parse the service
        var result = {};
        selectedPlugins.forEach(function(plugin) {
            result[plugin.name] = plugin.parse(services);
        });

        return result;
    };

    this.resolveAll = function resolveAll() {
        return this.parse(process.env.VCAP_SERVICES, null, true);
    };

    this.resolve = function resolve(serviceNames) {
        return this.parse(process.env.VCAP_SERVICES, serviceNames, false);
    };
}

module.exports = {
    Parser : Parser
};
