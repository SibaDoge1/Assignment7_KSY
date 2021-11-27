//응답 메시지 모음

module.exports = {
  SUCCESS: 'Request 성공',
  NULL_VALUE: '필요한 값이 없거나 잘못되었습니다.',
  OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
  WRONG_INDEX: '잘못된 인덱스 접근입니다.',
  DB_ERROR: 'DB 오류',
  INTERNAL_SERVER_ERROR: '서버 오류입니다.',
  DUPLICATE_ERROR: '중복된 요청입니다.',
  PERMISSION_ERROR: '권한이 없습니다.',
  ENTITY_NOT_EXIST: "DB에 없는 데이터 관련 요청입니다.",
  NO_PAGE_ERROR: "해당 라우트는 존재하지 않습니다.",

  // token
  EMPTY_TOKEN: '토큰 값이 없습니다.',
  EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
  AUTH_SUCCESS: '인증에 성공했습니다.',

  // 회원가입
  CREATED_USER: '회원 가입 성공',
  //FAIL_SINGUP: '회원 가입 실패',

  // 로그인
  LOGIN_SUCCESS: '로그인 성공',
  NO_USER: '존재하지 않는 회원입니다.',
  MISS_MATCH_PW: '비밀번호가 맞지 않습니다.',

  //타이어
  TIRE_SAVE_SUCCESS:'타이어 정보 저장에 성공했습니다.',
  TIRE_SAVE_FAIL:'저장에 실패한 타이어 정보가 존재합니다.',
  TIRE_READ_SUCCESS:'타이어 조회 성공',
};