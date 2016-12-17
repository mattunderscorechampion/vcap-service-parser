
'use strict';

var unknown = require('../main/unknown-service-plugin');

describe('Cloudant plugin', function() {
    var cloudantDetails = {
        "cloudantNoSQLDB": [
            {
                "credentials": {
                    "username": "X",
                    "password": "Y",
                    "host": "X.cloudant.com",
                    "port": 443,
                    "url": "https://X:Y@X.cloudant.com"
                },
                "syslog_drain_url": null,
                "label": "cloudantNoSQLDB",
                "provider": null,
                "plan": "Shared",
                "name": "Cloudant NoSQL DB-7r",
                "tags": [
                    "data_management",
                    "ibm_created",
                    "ibm_dedicated_public"
                ]
            }
        ]
    };

    it('it\'s name is provided', function() {
        var parser = new unknown.Parser('cloudantNoSQLDB');

        expect(parser.name).toBe('cloudantNoSQLDB');
    });

    it('extracts the cloudant credentials', function () {
        var parser = new unknown.Parser('cloudantNoSQLDB');

        var service = parser.parse(cloudantDetails);

        expect(service.host).toBe('X.cloudant.com');
        expect(service.port).toBe(443);
        expect(service.url).toBe('https://X:Y@X.cloudant.com');
        expect(service.username).toBe('X');
        expect(service.password).toBe('Y');

        expect(service.name).toBe('Cloudant NoSQL DB-7r');
        expect(service.plan).toBe('Shared');
    });

});
