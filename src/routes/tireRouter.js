const express = require("express");
const routes = require('../globals/routes');
const tireController = require('../controllers/tireController.js');
const {checkToken} = require("../middlewares/auth");
const tireRouter = express.Router();

//타이어 정보 저장
tireRouter.post(routes.ROOT, checkToken, tireController.postTire);

//타이어 조회
tireRouter.get(routes.TIRE_DETAIL, checkToken, tireController.getMyTires);

module.exports = tireRouter;