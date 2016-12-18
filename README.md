# VCAP Services Parser

## Node

A node VCAP services parser is provided. It supports parsing the
VCAP_SERVICES environmental variable and parsing it to a useful
value.

### Use

```javascript
var vcapServices = require('vcap-services-parser');

var parser = new vcapServices.Parser(vcapServices.bluemix);
var services = parser.resolveAll();

console.log(services.cloudant.host);
```

### Build

To build the node parser install `node` and `npm` then run
`npm run build` in the `node` directory.

