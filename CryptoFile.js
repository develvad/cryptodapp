const { createCipheriv, createECDH } = require('crypto');
const args = require('yargs').argv;
const fs = require('fs');
const path = require('path');

if(!args.private && !args.public && args.file) {
    console.log('Se necesitan los siguientes parametros: --private --public --file');
    process.exit();
}
const origin = createECDH('secp521r1');
// Set private Key from --private parameter
const key = fs.readFileSync(path.join(__dirname) + '/keys/' + args.private + ".key").toString();
origin.setPrivateKey(key, "hex");
// Set public Key from --public parameter
const public = fs.readFileSync(path.join(__dirname) + '/keys/' + args.public + ".pb").toString();
origin.setPrivateKey(key, "hex");
// Generate Secret shred key: 
const secret = Uint8Array.from(origin.computeSecret(public, "hex", "hex"));
// Encrypt file:
const algoritm = 'aes-256-cbc';
const cipher = createCipheriv(algoritm, secret.slice(0, 32), secret.slice(0, 16));
// file to encrypt from --file
const file = fs.readFileSync(path.join(__dirname) + '/' + args.file);
let encrypt = cipher.update(file, 'utf-8', 'hex');
encrypt = encrypt + cipher.final("hex");
fs.writeFileSync(path.join(__dirname) + '/' + args.file + '.encrypt', encrypt);
