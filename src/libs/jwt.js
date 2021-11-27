const jsonwebtoken = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.js');
const logger = require('../utils/logger.js');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

exports.sign = async (user) => {
    const payload = {
        userId : user.id
    };

    const token = jsonwebtoken.sign(payload, jwtConfig.JWT_SECERT, jwtConfig.OPTIONS)
    const decrypt =  jsonwebtoken.verify(token, jwtConfig.JWT_SECERT)
    

    const result = {
        accessToken: token,
        expires: decrypt.exp,
    };

    return result;
}

exports.verify = async (token) => {
    let decoded;
        try {
            decoded = jsonwebtoken.verify(token, jwtConfig.JWT_SECERT);
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
        return decoded;
}