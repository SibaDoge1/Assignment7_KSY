const models = require('../models');
const logger = require('../utils/logger');
const logTag = 'DB:TIRE';

//거래내역생성
exports.createTires = async (tireDatas) => {
  try {
    //계좌 잔액 조회
    const result = await models.tire.bulkCreate(
      tireDatas, 
      { 
        updateOnDuplicate:['width', 'aspectRatio', 'wheelSize']
      }
    );

    return result;
  } catch (err) {
    throw err;
  }
}


exports.readTiresByUser = async (userId) => {
  try {
    return models.tire.findAll(
      {
        where : {
          userId: `${userId}`
        }
      }, 
      { 
        raw: true
      }
    );
  } catch (err) {
    throw err;
  }
}
