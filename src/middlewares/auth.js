const jwt = require('../libs/jwt.js');
const { InvalidTokenError, ExpiredTokenError, EmptyTokenError } = require("../utils/errors/tokenError");
const { NotMatchedUserError } = require("../utils/errors/userError");
const { readUser: checkUser } = require("../services/userService");

//토큰 만료
const TOKEN_EXPIRED = -3;
//토큰 무효
const TOKEN_INVALID = -2;

//토큰 확인
exports.checkToken = async (req, res, next) => {
    try {
        //const authorization = req.headers.authorization;
        const authorization = req.headers.authorization;

        //토큰이 없는경우
        if (!authorization) {
            throw new EmptyTokenError();
        }

        //토큰 인증(확인)
        const user = await jwt.verify(authorization);

        //토큰 만료되는 경우 
        if (user === TOKEN_EXPIRED) {
            throw new ExpiredTokenError();
        }

        //토큰 무효되는 경우
        if (user === TOKEN_INVALID || user.userId === undefined) {
            throw new InvalidTokenError();
        }

        const userDB = await checkUser(user.userId);
        if (userDB == undefined) {
            throw new NotMatchedUserError();
        }

        req.decoded = user;
        next();
    } catch (err) {
        next(err);
    }
}