
'use strict';

var unknown = require('./unknown-service-plugin');

function Parser(plugins) {
    var pluginsBySelector = {};
    var pluginsByName = {};
    plugins.forEach(function (plugin) {
        pluginsBySelector[plugin.selector] = plugin;
        pluginsByName[plugin.name] = plugin;
    });

    function pluginForName(serviceName) {
        var selectedPlugin = pluginsByName[serviceName];

        if (selectedPlugin) {
            return selectedPlugin;
        }
        else {
            return new unknown.Parser(serviceName);
        }
    }

    function selectPlugins(serviceNames) {
        if (typeof serviceNames === 'string') {
            return [serviceNames].map(pluginForName);
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            return serviceNames.map(pluginForName);
        }
        throw new Error('Failed to resolve service names');
    }

    function availableServices(services) {
        var available = [];
        for (var property in services) {
            if (services.hasOwnProperty(property)) {
                var plugin = pluginsBySelector[property];
                if (plugin) {
                    available.push(plugin.name);
                }
                else {
                    available.push(property);
                }
            }
        }
        return available;
    }

    function processServices(selectedPlugins, services) {
        var result = {};
        selectedPlugins.forEach(function(plugin) {
            result[plugin.name] = plugin.parse(services);
        });

        return result;
    }

    this.parse = function parse(services, serviceNames) {
        var returnSingleService = false;
        // Ensure the services are an object
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        // Find the names of the services to parse
        if (!serviceNames) {
            serviceNames = availableServices(services);
        }
        else if (typeof serviceNames === 'string') {
            returnSingleService = true;
        }

        // Select the plugins to parse with
        var selectedPlugins = selectPlugins(serviceNames);

        // Use the selected plugins to parse the service
        var parsedServices = processServices(selectedPlugins, services);

        if (returnSingleService) {
            return parsedServices[serviceNames];
        }
        else {
            return parsedServices;
        }
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
