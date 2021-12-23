const router = require('express').Router();
const Controller = require('../controller/productController');

router.get('/by-tag/search', Controller.getByTag);

module.exports = router;