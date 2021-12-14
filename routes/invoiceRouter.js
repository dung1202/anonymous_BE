const router = require('express').Router();
const { auth } = require('../helper/auth');
const Controller = require('../controller/invoiceController');

<<<<<<< HEAD
router.post('/auth/create', auth, Controller.create);
router.get('/auth/search', auth, Controller.getInvoice);
router.get('/auth/update', auth, Controller.update);
router.get('/auth/deleteone', auth, Controller.deleteOne);
=======
router.get('/auth/create', auth, Controller.create);
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669

module.exports = router;