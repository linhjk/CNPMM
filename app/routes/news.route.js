var express = require('express');
var controller = require("../controllers/news.controller");
var router = express.Router();

router.get('/news', controller.getNews);
router.post('/news',controller.addNews);
router.post('/findnew',controller.getNewsFromCategory);

module.exports = router;