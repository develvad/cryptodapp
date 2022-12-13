const { createDecipheriv, createECDH } = require('crypto');
const args = require('yargs').argv;
const fs = require('fs');
const path = require('path');

if(!args.file && !args.private && !args.public) {
    console.log('Faltan parametros', args);
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

const algoritm = 'aes-256-cbc';
const decipher = createDecipheriv(algoritm, secret.slice(0, 32), secret.slice(0, 16));
fs.createReadStream(path.join(__dirname) + '/' + args.file)
    .pipe(decipher)
    .pipe(new fs.createWriteStream(path.join(__dirname) + '/' + args.file + '.decrypt'))
//
// without stream way
// file to encrypt from --file
// const file = fs.readFileSync(path.join(__dirname) + '/' + args.file).toString();
// let decrypt = decipher.update(file, 'hex', 'utf-8');
// decrypt += decipher.final("utf-8");
// console.log(decrypt);
// fs.writeFileSync(path.join(__dirname) + '/' + args.file + '.decrypt', decrypt);
// const inputFile = fs.readFileSync(path.join(__dirname) + '/' + args.file).toString();
