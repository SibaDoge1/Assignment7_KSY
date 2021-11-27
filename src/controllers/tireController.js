const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const tireService = require('../services/tireService.js');
const logger = require('../utils/logger');
const { ValidationError, UnAuthorizedError } = require('../utils/errors/commonError');
const cardorApi = require('../libs/cardocApi')



//타이어 정보 저장 api
exports.postTire = async (req, res, next) => {
    try {
        const userId = req.decoded.userId;
        const { datas: trimsArr } = req.body;

        // 토큰이 유효하지 않으면 에러처리
        if (userId === undefined)
            throw new UnAuthorizedError();

        // 입력값이 잘 들어오지 않는다면 에러처리
        if (!isTrimsArrValid(trimsArr))
            throw new ValidationError();

        //카닥 api에 타이어 정보 요청
        let apiCalls = []
        for (let data of trimsArr) {
            apiCalls.push(cardorApi.getTireData(Number(data.trimId)));
        }
        let tireDatas = await Promise.all(apiCalls)  

        //db에 넣기위한 데이터 전처리
        let dbRawDatas = []   
        tireDatas.forEach((data, idx)=>{
            data.front.type = 'front',
            data.front.userId = trimsArr[idx].id
            data.rear.type = 'rear',
            data.rear.userId = trimsArr[idx].id
            dbRawDatas.push(data.front)
            dbRawDatas.push(data.rear)
        })

        const createResults = await tireService.createTires(dbRawDatas);

        return res.status(statusCode.OK)
            .send(resFormatter.success(responseMessage.TIRE_SAVE_SUCCESS, createResults));
    }
    catch (err) {
        next(err);
    }
}

//타이어 조회 api
exports.getMyTires = async (req, res, next) => {
    try {
        const userId = req.decoded.userId;

        // 토큰이 유효하지 않으면 에러처리
        if (userId === undefined)
            throw new UnAuthorizedError();

        const tires = await tireService.readTiresByUser(userId)

        return res.status(statusCode.OK)
            .send(resFormatter.success(responseMessage.TIRE_READ_SUCCESS, tires));
    }
    catch (err) {
        next(err);
    }

}

//차종 데이터가 제대로 들어왔는지 확인
function isTrimsArrValid(trimsArr) {
    if (trimsArr === undefined) return false;

    for (let data of trimsArr) {
        if (data.id === undefined || !Number(data.trimId)) return false;
    }

    return true;
}