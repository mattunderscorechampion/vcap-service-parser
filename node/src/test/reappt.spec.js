
'use strict';

var vcap = require('../main/vcap-parser'),
    reappt = require('../main/reappt');

describe('Reappt plugin', function() {
    var reapptDetails = {
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
        ]
    };

    it('is named reappt', function() {
        var parser = new reappt.Parser();

        expect(parser.name).toBe('reappt');
    });

    it('extracts the reappt credentials', function () {
        var parser = new reappt.Parser();

        var service = parser.parse(reapptDetails);

        expect(service.host).toBe('example.us.reappt.io');
        expect(service.principal).toBe('X');
        expect(service.credentials).toBe('Y');
    });

});
