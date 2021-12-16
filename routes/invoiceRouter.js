const router = require('express').Router();
const { auth } = require('../helper/auth');
const Controller = require('../controller/invoiceController');

router.post('/auth/create', auth, Controller.create);
router.get('/auth/get', auth, Controller.getInvoice);
router.put('/auth/update', auth, Controller.update);

module.exports = router;