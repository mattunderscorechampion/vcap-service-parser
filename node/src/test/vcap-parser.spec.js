
'use strict';

var vcap = require('../main/vcap-parser'),
    reappt = require('../main/bluemix/reappt');

describe('VCAP service parser', function() {

    it('can find Reappt service', function() {
        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.parse({
            'push-reappt' : [{}]
        });

        expect(services.reappt).toBe(null);
    });

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

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
    });

    it('can resolve a specific service from environmental variables', function() {
        process.env.VCAP_SERVICES = '{"push-reappt":[{"credentials":{"host":"host","principal":"principal","credentials":"credentials"}}]}';

        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.resolve('reappt');

        expect(services.reappt.host).toBe("host");
        expect(services.reappt.principal).toBe("principal");
        expect(services.reappt.credentials).toBe("credentials");
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
});
