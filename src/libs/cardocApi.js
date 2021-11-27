const axios = require('axios');

const baseUrl = 'https://dev.mycar.cardoc.co.kr/v1/trim/';
const regex = /(?<width>\d*)\/(?<aspectRatio>\d*)R(?<wheelSize>\d*)/;

async function getTireData(trimId){
  try{
    const res = await axios.get(baseUrl+trimId);
    const frontTire = regex.exec(res.data.spec.driving.frontTire.value);
    const rearTire = regex.exec(res.data.spec.driving.frontTire.value);
    
    if(frontTire === null || rearTire === null) return {};
  
    return {
      front:Object.assign({},frontTire.groups),
      rear:Object.assign({},rearTire.groups),
    };
  }
  catch(err){
    if(err.response && err.response.status == 500){
      return {};
    }
    else{
      throw err;
    }
  }
}

exports.getTireData = getTireData;