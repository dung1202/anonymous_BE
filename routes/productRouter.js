const router = require('express').Router();
const Controller = require('../controller/productController');

router.get('/by-tag/search', Controller.getByTag);
router.get('/by-name/search', Controller.getByName);

module.exports = router;