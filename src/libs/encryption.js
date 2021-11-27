const crypto = require('crypto');

exports.makeSalt = () => {
    return crypto.randomBytes(32).toString('hex');
}

exports.encrypt = (password, salt) => {
    const key = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512');
    return key.toString('hex');
}