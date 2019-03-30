var crypto = require('crypto-js');

var secrectMessage = {
    name: 'facebook',
    secretName: '007'
};

var secrectKey = '123abc';

//Encrypt
var encryptedMesage = crypto.AES.encrypt(JSON.stringify(secrectMessage),secrectKey);

console.log('Encrypted Message');

var bytes = crypto.AES.decrypt(encryptedMesage, secrectMessage);