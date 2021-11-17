const router = require('express').Router();
const Controller = require('../controller/accController');
const Middleware = require('../middleware/accMiddleware');

router.post('/login', Middleware.login, Controller.login);
router.post('/register', Middleware.register, Controller.register);

module.exports = router;