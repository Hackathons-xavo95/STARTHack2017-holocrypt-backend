var crypto = require('crypto');

function getHash(password, callback) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    var hashedpassword = hash.digest('hex');
    callback(hashedpassword);
}

function encrypt(text, password, callback){
    var cipher = crypto.createCipher('aes-256-ctr',password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    callback(crypted);
}

function decrypt(text, password, callback){
    var decipher = crypto.createDecipher('aes-256-ctr',password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    callback(dec);
}

module.exports = {
    returnHash: function (password, callback) {
        getHash(password, callback);
    },
    returnEncryptedMessage: function (text, password, callback) {
        encrypt(text, password, callback);
    },
    returnDecryptedMessage: function (text, password, callback) {
        decrypt(text, password, callback);
    }
};