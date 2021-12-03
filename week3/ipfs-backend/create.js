// Dependency
const IPFS = require('ipfs');

(async () => {

// Initialise IPFS node
const node = await IPFS.create();

// Set some data to a variable
const data = 'Hello, Chris here';

 // Submit data to the network
 const cid = await node.add(data);

 // Log CID to console
 console.log(cid.path);
 })();