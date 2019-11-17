var express = require('express');
var controller = require("../controllers/login.controller");
var router = express.Router();

router.get('/login', controller.login);
router.post('/login',controller.postlogin);

module.exports = router;