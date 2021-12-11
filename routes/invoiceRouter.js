const router = require('express').Router();
const { auth } = require('../helper/auth');
const Controller = require('../controller/invoiceController');

router.get('/auth/create', auth, Controller.create);

module.exports = router;