const express = require('express');
const routes = require('../globals/routes');

const userController = require('../controllers/userController.js');

const tokenRouter = express.Router();

//유저생성
tokenRouter.post(routes.ROOT, userController.postToken);


module.exports = tokenRouter;
