const router = require('express').Router();
const { auth } = require('../helper/auth');
const Controller = require('../controller/invoiceController');

router.post('/auth/create', auth, Controller.create);
router.get('/auth/search', auth, Controller.getInvoice);
router.get('/auth/update', auth, Controller.update);
router.get('/auth/deleteone', auth, Controller.deleteOne);

module.exports = router;