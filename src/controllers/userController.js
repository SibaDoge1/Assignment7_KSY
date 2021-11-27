const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
const jwt = require('../libs/jwt.js');
const { resFormatter } = require('../utils');
const {
  DuplicatedError,
  PasswordMissMatchError,
  NotMatchedUserError,
} = require('../utils/errors/userError');
const { ValidationError } = require('../utils/errors/commonError');

const userService = require('../services/userService.js');
const logger = require('../utils/logger');

//회원가입
exports.postUser = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    //입력값 확인
    if (id === undefined || password === undefined) {
      throw new ValidationError();
    }

    //이름 중복 여부
    const isExists = await userService.readUser(id);
    if (isExists) throw new DuplicatedError();

    //암호화
    const salt = encryption.makeSalt();
    const encryptPassword = encryption.encrypt(password, salt);

    logger.log(encryptPassword)
    //쿼리실행
    await userService.createUser(id, encryptPassword, salt);

    return res
      .status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATED_USER));
  } catch (err) {
    next(err);
  }
};

//토큰 생성(로그인)
exports.postToken = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    //입력값 확인
    if (id === undefined || password === undefined) throw new ValidationError();


    const user = await userService.readUser(id);
    
    //회원가입 여부 확인
    if (!user) throw new NotMatchedUserError();
    
    //확인용 암호화
    const { salt, password: realPassword } = user;
    const inputPassword = encryption.encrypt(password, salt);

    //패스워드 불일치
    if (inputPassword !== realPassword) throw new PasswordMissMatchError();
    
    //토큰 반환
    const { accessToken } = await jwt.sign(user);

    return res
      .status(statusCode.OK)
      .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, { accessToken }))
  } catch (err) {
    next(err);
  }
};
