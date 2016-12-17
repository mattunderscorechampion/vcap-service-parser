
'use strict';

function Parser(plugins) {
    this.parse = function parse(services) {
        if (typeof services === 'string') {
            services = JSON.parse(services);
        }

        var result = {};
        var plugin;
        plugins.forEach(function(plugin) {
            result[plugin.name] = plugin.parse(services);
        });
        return result;
    };

    this.resolveAll = function resolveAll() {
        return this.parse(process.env.VCAP_SERVICES);
    };
}

module.exports = {
    Parser : Parser
};
