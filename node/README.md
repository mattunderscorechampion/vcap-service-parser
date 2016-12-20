
# Node VCAP Services Parser

[![npm version](https://badge.fury.io/js/vcap-services-parser.svg)](https://badge.fury.io/js/vcap-services-parser)

A parser for `VCAP_SERVICES` environmental variable used
by CloudFoundry applications. It can return all of the
services bound to an application or a subset of them.

## Usage

```javascript
// Import the module
var vcapServices = require('vcap-services-parser');

// Create a parser with plugins for supported Bluemix services
var parser = new vcapServices.Parser(vcapServices.bluemix);

// Resolve all services
var services = parser.resolveAll();
console.log(services.cloudant.host);

// Resolve a specific service
var selectedServices = parser.resolve('speech-to-text');
console.log(selectedServices['speech-to-text'].url);
```

## Services

When services are resolved an object is returned containing
a map from the service name to a description of the
service. Included in all service descriptions are the
instance `name`, `plan` and service `tags`. Different services
can have different properties.

### Supported services

#### Bluemix

##### Availability monitoring

Uses the name `monitoring` for service descriptions.
The description includes the properties `url`, `id` and
`pass`.

##### Cloudant

Uses the name `cloudant` for service descriptions.
The description includes the properties `host`, `port`,
`url`, `username` and `password`.

##### Reappt

Uses the name `reappt` for service descriptions.
The description includes the properties `host`,
`principal` and `credentials`.

##### Push notifications

Uses the name `push-notifications` for service descriptions.
The description includes the properties `url`,
`admin_url` and `appSecret`.

##### Speech to Text

Uses the name `speech-to-text` for service descriptions.
The description includes the properties `url`,
`username` and `password`.

##### Twitter insights

Uses the name `twitter-insights` for service descriptions.
The description includes the properties `host`, `port`,
`url`, `username` and `password`.

### Unsupported services

Unsupported services copy all entries from the
`credentials` property onto the service description.
