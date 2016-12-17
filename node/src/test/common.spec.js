
'use strict';

var common = require('../main/common');

describe('Common parser', function() {
    var details = {
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
    };

    var services = {
        'push-reappt' : [details]
    };

    it('extracts the service name', function () {
        var service = common.parse(details);

        expect(service.name).toBe('reappt-service');
    });

    it('extracts the service plan', function () {
        var service = common.parse(details);

        expect(service.plan).toBe('free');
    });

    it('extracts the service tags', function () {
        var service = common.parse(details);

        expect(service.tags[0]).toBe('(S) Cloud');
    });

    it('can get the instance information', function () {
        var instance = common.getInstance(services, 'push-reappt');

        expect(instance).toBe(details);
    });
});
