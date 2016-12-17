
'use strict';

var vcap = require('../main/vcap-parser'),
    monitoring = require('../main/bluemix/availability-monitoring');

describe('Monitoring plugin', function() {
    var monitoringDetails = {
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
    };

    it('is named monitoring', function() {
        var parser = new monitoring.Parser();

        expect(parser.name).toBe('monitoring');
    });

    it('extracts the monitoring credentials', function () {
        var parser = new monitoring.Parser();

        var service = parser.parse(monitoringDetails);

        expect(service.url).toBe('https://perfbroker.ng.bluemix.net/1.0/credentials/Z');
        expect(service.id).toBe('Y');
        expect(service.pass).toBe('X');

        expect(service.name).toBe('availability-monitoring-auto');
        expect(service.plan).toBe('Lite');
    });

});
