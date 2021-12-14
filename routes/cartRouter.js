const router = require('express').Router();
const { auth } = require('../helper/auth');
const Controller = require('../controller/cartController');

router.get('/auth', auth, Controller.getCart);
router.post('/auth/additem', auth, Controller.addItem);
router.put('/auth/changeqty', auth, Controller.changeQty);
router.delete('/auth/removeitem', auth, Controller.removeItem);
router.delete('/auth/removeall', auth, Controller.removeAll);

module.exports = router;