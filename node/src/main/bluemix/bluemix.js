
'use strict';

var monitoring = require('./availability-monitoring'),
    reappt = require('./reappt'),
    speechToText = require('./speech-to-text'),
    twitterInsights = require('./twitter-insights'),
    cloudant = require('./cloudant'),
    pushNotifications = require('./push-notifications');

var plugins = [
    new monitoring.Parser(),
    new reappt.Parser(),
    new speechToText.Parser(),
    new twitterInsights.Parser(),
    new cloudant.Parser(),
    new pushNotifications.Parser()
];

Object.freeze(plugins);

module.exports = {
    plugins : plugins
};
