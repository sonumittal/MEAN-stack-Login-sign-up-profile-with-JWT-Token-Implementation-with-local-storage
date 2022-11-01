const express = require('express');
const router = express.Router(); // for configuring routing 
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/signup', ctrlUser.register); //  post request for signup
router.post('/authenticate', ctrlUser.authenticate); //  post request for user authentication 
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route with jwt token middleware: making this route private with jwt token here using jwtHelper.verifyJwtToken function will be called before userProfile and will verify jwt token that is attached with this request from clint is right or not

module.exports = router;


// private route using jwt: in order to access private route from node.js application clint side application must attach jwt token in the request header.



