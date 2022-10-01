const express = require('express');
const router = express.Router();
const authMw = require('../MW/authMw');
const loginController = require('../controllers/loginController');

router.route('/login')
 
    .post(loginController.login);


module.exports = router;