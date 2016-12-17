
'use strict';

function Parser(plugins) {
    var filterPluginsForServices = function(serviceNames) {
        return plugins.filter(function (plugin) {
            return serviceNames.findIndex(function (serviceName) {
                    return plugin.name === serviceName;
                }) !== -1;
        });
    };

    this.parse = function parse(services, serviceNames) {
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        var selectedPlugins = plugins;
        if (typeof serviceNames === 'string') {
            selectedPlugins = selectedPlugins.filter(function (plugin) {
                return plugin.name === serviceNames;
            });
        }
        else if (typeof serviceNames && serviceNames instanceof Array) {
            selectedPlugins = filterPluginsForServices(serviceNames);
        }

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
