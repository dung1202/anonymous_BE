const router = require('express').Router();
const Controller = require('../controller/accController');
const Middleware = require('../middleware/accMiddleware');
const { auth, authAdmin } = require('../helper/auth');

router.post('/login', Middleware.login, Controller.login);
router.post('/register', Middleware.register, Controller.register);
router.get('/auth/profile', auth, Controller.getProfile);
router.get('/auth/invoice', auth, Controller.getInvoice);
router.post('/auth/checktoken', auth, Controller.checkToken);
router.post('/admin/login', Controller.loginAdmin);
router.put('/auth/changepwd', auth, Controller.changePwd);
router.post('/forgot-password', Controller.forgotPassword);
router.post('/auth/send-news-letter', authAdmin, Controller.sendNewsLetter);

module.exports = router;