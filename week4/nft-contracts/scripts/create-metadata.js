var Validator = require('jsonschema').Validator;
const schema = require('../schemas/ERC721Metadata.json');
const chrisMetadata = require('../metadata/cheetah-nft.json');
var v = new Validator();
metaData = 
console.log(schema);
console.log(v.validate(chrisMetadata, schema).valid);
// console.log(v.validate(instance, schema).); 