
'use strict';

function Parser(plugins) {
    var filterPluginsForServices = function(serviceNames) {
        return plugins.filter(function (plugin) {
            return serviceNames.findIndex(function (serviceName) {
                    return plugin.name === serviceName;
                }) !== -1;
        });
    };

    var filterPluginsForService = function(serviceNames) {
        return plugins.filter(function (plugin) {
            return plugin.name === serviceNames;
        });
    };
    
    var selectPlugins = function (serviceNames) {
        if (typeof serviceNames === 'string') {
            return filterPluginsForService(serviceNames);
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            return filterPluginsForServices(serviceNames);
        }
        return plugins;
    };

    this.parse = function parse(services, serviceNames) {
        // Ensure the services are an object
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        // Select the plugins to parse with
        var selectedPlugins = selectPlugins(serviceNames);

        // Use the selected plugins to parse the service
        var result = {};
        selectedPlugins.forEach(function(plugin) {
            result[plugin.name] = plugin.parse(services);
        });

        return result;
    };

    this.resolveAll = function resolveAll() {
        return this.parse(process.env.VCAP_SERVICES);
    };

    this.resolve = function resolve(serviceNames) {
        return this.parse(process.env.VCAP_SERVICES, serviceNames);
    };
}

module.exports = {
    Parser : Parser
};
