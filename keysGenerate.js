const { createECDH } = require('crypto');   
const args = require('yargs').argv;
const fs = require("fs");
const path = require("path");

if(!args.keyname) {
    console.log('Need --keyname argument. Example: --keyname boothkeys');
    process.exit();
}
// Construct Both kets
const keyPair = createECDH('secp521r1');
const publicKey = keyPair.generateKeys("hex");
const privateKey = keyPair.getPrivateKey("hex");
// Generate Files
fs.writeFileSync(path.join(__dirname) + '/keys/' + args.keyname + '.key', privateKey);
fs.writeFileSync(path.join(__dirname) + '/keys/' + args.keyname + '.pb', publicKey);