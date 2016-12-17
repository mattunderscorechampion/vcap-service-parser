
'use strict';

var vcap = require('../main/vcap-parser'),
    twitterInsights = require('../main/bluemix/twitter-insights');

describe('Twitter insights plugin', function() {
    var twitterInsightsDetails = {
        "twitterinsights": [
            {
                "credentials": {
                    "username": "X",
                    "password": "Y",
                    "host": "cdeservice.mybluemix.net",
                    "port": 443,
                    "url": "https://X:Y@cdeservice.mybluemix.net"
                },
                "syslog_drain_url": null,
                "label": "twitterinsights",
                "provider": null,
                "plan": "Free",
                "name": "Insights for Twitter-cb",
                "tags": [
                    "big_data",
                    "ibm_created",
                    "ibm_dedicated_public"
                ]
            }
        ]
    };

    it('is named twitter-insights', function() {
        var parser = new twitterInsights.Parser();

        expect(parser.name).toBe('twitter-insights');
    });

    it('extracts the twitter insights credentials', function () {
        var parser = new twitterInsights.Parser();

        var service = parser.parse(twitterInsightsDetails);

        expect(service.url).toBe('https://X:Y@cdeservice.mybluemix.net');
        expect(service.username).toBe('X');
        expect(service.password).toBe('Y');
        expect(service.host).toBe('cdeservice.mybluemix.net');
        expect(service.port).toBe(443);

        expect(service.name).toBe('Insights for Twitter-cb');
        expect(service.plan).toBe('Free');
    });

});
