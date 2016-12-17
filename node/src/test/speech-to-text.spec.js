
'use strict';

var vcap = require('../main/vcap-parser'),
    speechToText = require('../main/bluemix/speech-to-text');

describe('Speech to text plugin', function() {
    var speechToTextDetails = {
        "speech_to_text": [
            {
                "credentials": {
                    "url": "https://stream.watsonplatform.net/speech-to-text/api",
                    "password": "X",
                    "username": "Y"
                },
                "syslog_drain_url": null,
                "label": "speech_to_text",
                "provider": null,
                "plan": "standard",
                "name": "Speech to Text",
                "tags": [
                    "watson",
                    "ibm_created",
                    "ibm_dedicated_public"
                ]
            }
        ]
    };

    it('is named speech-to-text', function() {
        var parser = new speechToText.Parser();

        expect(parser.name).toBe('speech-to-text');
    });

    it('extracts the speech to text credentials', function () {
        var parser = new speechToText.Parser();

        var service = parser.parse(speechToTextDetails);

        expect(service.url).toBe('https://stream.watsonplatform.net/speech-to-text/api');
        expect(service.username).toBe('Y');
        expect(service.password).toBe('X');

        expect(service.name).toBe('Speech to Text');
        expect(service.plan).toBe('standard');
    });

});
