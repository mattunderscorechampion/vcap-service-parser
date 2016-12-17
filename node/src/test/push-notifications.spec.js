
'use strict';

var vcap = require('../main/vcap-parser'),
    cloudant = require('../main/bluemix/push-notifications');

describe('Cloudant plugin', function() {
    var cloudantDetails = {
        "imfpush": [
            {
                "credentials": {
                    "url": "http://imfpush.ng.bluemix.net/imfpush/v1/apps/Y",
                    "admin_url": "//mobile.ng.bluemix.net/imfpushdashboard/?appGuid=Y",
                    "appSecret": "X"
                },
                "syslog_drain_url": null,
                "label": "imfpush",
                "provider": null,
                "plan": "Basic",
                "name": "Push Notifications-t0",
                "tags": [
                    "mobile",
                    "ibm_created",
                    "ibm_dedicated_public"
                ]
            }
        ]
    };

    it('is named push-notifications', function() {
        var parser = new cloudant.Parser();

        expect(parser.name).toBe('push-notifications');
    });

    it('extracts the push-notifications credentials', function () {
        var parser = new cloudant.Parser();

        var service = parser.parse(cloudantDetails);

        expect(service.url).toBe('http://imfpush.ng.bluemix.net/imfpush/v1/apps/Y');
        expect(service.admin_url).toBe('//mobile.ng.bluemix.net/imfpushdashboard/?appGuid=Y');
        expect(service.appSecret).toBe('X');

        expect(service.name).toBe('Push Notifications-t0');
        expect(service.plan).toBe('Basic');
    });

});
