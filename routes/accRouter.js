const router = require('express').Router();
const Controller = require('../controller/accController');
const Middleware = require('../middleware/accMiddleware');
const { auth } = require('../helper/auth');

router.post('/login', Middleware.login, Controller.login);
router.post('/register', Middleware.register, Controller.register);
router.get('/auth/profile', auth, Controller.getProfile);
router.post('/auth/checktoken', auth, Controller.checkToken);

module.exports = router;