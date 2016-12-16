
'use strict';

var vcap = require('../main/vcap-parser'),
    reappt = require('../main/reappt');

describe('Reappt plugin', function() {

  it('is named reappt', function() {
      var parser = new reappt.Parser();

      expect(parser.name).toBe('reappt');
  });

});
