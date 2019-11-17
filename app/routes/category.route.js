var controller = require('../controllers/category.controller');
var express = require('express');
var router = express.Router();

router.post('/addcategory', controller.addCategory);
router.post('/newstocategory', controller.addNewsToCategory);
module.exports = router;