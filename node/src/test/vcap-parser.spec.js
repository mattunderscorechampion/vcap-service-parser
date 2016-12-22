
'use strict';

var vcap = require('../main/vcap-parser'),
    reappt = require('../main/bluemix/reappt'),
    bluemix = require('../main/bluemix/bluemix');

describe('VCAP service parser', function() {

    it('can handle a string with the Reappt service', function() {
        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.parse('{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}');

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
    });

    it('can resolve the Reappt service from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.resolveAll();

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
    });

    it('can parse a specific service', function() {
        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.parse('{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}', 'reappt');

        expect(services.host).toBe("host");
        expect(services.principal).toBe("principal");
        expect(services.credentials).toBe("credentials");
    });

    it('can resolve a specific service from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.resolve('reappt');

        expect(services.host).toBe("host");
        expect(services.principal).toBe("principal");
        expect(services.credentials).toBe("credentials");
    });

    it('can parse a list of specific services', function() {
        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.parse('{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}', ['reappt']);

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
    });

    it('can resolve a list of specific services from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.resolve(['reappt']);

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
    });

    it('can resolve unknown services from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([]);
        var services = parser.resolveAll();

        expect(services['push-reappt'].host).toBe("host");
        expect(services['push-reappt'].principal).toBe("principal");
        expect(services['push-reappt'].credentials).toBe("credentials");
    });

    it('can resolve specific unknown services from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([]);
        var services = parser.resolve('push-reappt');

        expect(services.host).toBe("host");
        expect(services.principal).toBe("principal");
        expect(services.credentials).toBe("credentials");
    });

    it('can resolve all of multiple services', function() {
        process.env.VCAP_SERVICES = JSON.stringify({
            "push-reappt": [
                {
                    "credentials": {
                        "host": "example.us.reappt.io",
                        "principal": "X",
                        "credentials": "Y"
                    },
                    "syslog_drain_url": null,
                    "label": "push-reappt",
                    "provider": null,
                    "plan": "free",
                    "name": "reappt-service",
                    "tags": [
                        "(S) Cloud"
                    ]
                }
            ],
            "AvailabilityMonitoring": [
                {
                    "credentials": {
                        "pass": "X",
                        "id": "Y",
                        "url": "https://perfbroker.ng.bluemix.net/1.0/credentials/Z"
                    },
                    "syslog_drain_url": null,
                    "label": "AvailabilityMonitoring",
                    "provider": null,
                    "plan": "Lite",
                    "name": "availability-monitoring-auto",
                    "tags": [
                        "ibm_created",
                        "bluemix_extensions",
                        "dev_ops"
                    ]
                }
            ]
        });

        var parser = new vcap.Parser(bluemix.plugins);
        var services = parser.resolveAll();

        expect(services.reappt.host).toBe("example.us.reappt.io");
        expect(services.reappt.principal).toBe("X");
        expect(services.reappt.credentials).toBe("Y");
        expect(services.monitoring.url).toBe("https://perfbroker.ng.bluemix.net/1.0/credentials/Z");
        expect(services.monitoring.id).toBe("Y");
        expect(services.monitoring.pass).toBe("X");
    });

    it('can resolve a specific service of multiple services', function() {
        process.env.VCAP_SERVICES = JSON.stringify({
            "push-reappt": [
                {
                    "credentials": {
                        "host": "example.us.reappt.io",
                        "principal": "X",
                        "credentials": "Y"
                    },
                    "syslog_drain_url": null,
                    "label": "push-reappt",
                    "provider": null,
                    "plan": "free",
                    "name": "reappt-service",
                    "tags": [
                        "(S) Cloud"
                    ]
                }
            ],
            "AvailabilityMonitoring": [
                {
                    "credentials": {
                        "pass": "X",
                        "id": "Y",
                        "url": "https://perfbroker.ng.bluemix.net/1.0/credentials/Z"
                    },
                    "syslog_drain_url": null,
                    "label": "AvailabilityMonitoring",
                    "provider": null,
                    "plan": "Lite",
                    "name": "availability-monitoring-auto",
                    "tags": [
                        "ibm_created",
                        "bluemix_extensions",
                        "dev_ops"
                    ]
                }
            ]
        });

        var parser = new vcap.Parser(bluemix.plugins);
        var services = parser.resolve('monitoring');

        expect(services.url).toBe("https://perfbroker.ng.bluemix.net/1.0/credentials/Z");
        expect(services.id).toBe("Y");
        expect(services.pass).toBe("X");
    });

    it('can resolve specific services of multiple services', function() {
        process.env.VCAP_SERVICES = JSON.stringify({
            "push-reappt": [
                {
                    "credentials": {
                        "host": "example.us.reappt.io",
                        "principal": "X",
                        "credentials": "Y"
                    },
                    "syslog_drain_url": null,
                    "label": "push-reappt",
                    "provider": null,
                    "plan": "free",
                    "name": "reappt-service",
                    "tags": [
                        "(S) Cloud"
                    ]
                }
            ],
            "AvailabilityMonitoring": [
                {
                    "credentials": {
                        "pass": "X",
                        "id": "Y",
                        "url": "https://perfbroker.ng.bluemix.net/1.0/credentials/Z"
                    },
                    "syslog_drain_url": null,
                    "label": "AvailabilityMonitoring",
                    "provider": null,
                    "plan": "Lite",
                    "name": "availability-monitoring-auto",
                    "tags": [
                        "ibm_created",
                        "bluemix_extensions",
                        "dev_ops"
                    ]
                }
            ]
        });

        var parser = new vcap.Parser(bluemix.plugins);
        var services = parser.resolve('monitoring');

        expect(services.url).toBe("https://perfbroker.ng.bluemix.net/1.0/credentials/Z");
        expect(services.id).toBe("Y");
        expect(services.pass).toBe("X");
    });
});
