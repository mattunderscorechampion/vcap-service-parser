
'use strict';

var vcap = require('../main/vcap-parser'),
    reappt = require('../main/reappt');

describe('VCAP service parser', function() {

    it('can find Reappt service', function() {
        var parser = new vcap.Parser([new reappt.Parser()]);
        var services = parser.parse({
            'push-reappt' : [{}]
        });

        expect(services.reappt).toBe(null);
    });

});
