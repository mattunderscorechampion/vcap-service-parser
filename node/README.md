# Node VCAP Services Parser

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
