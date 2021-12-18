const router = require('express').Router();
const { auth, authAdmin } = require('../helper/auth');
const Controller = require('../controller/invoiceController');

router.post('/auth/create', auth, Controller.create);
router.get('/auth/get', authAdmin, Controller.getInvoice);
router.put('/auth/update', authAdmin, Controller.update);

module.exports = router;