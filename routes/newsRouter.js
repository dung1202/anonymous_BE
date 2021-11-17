const router = require('express').Router();
const Controller = require('../controller/newsController');
const {auth} = require('../helper/auth');

router.post('/auth/create', auth, Controller.createNews);
router.get('/:id', Controller.getNews);
router.get('', Controller.getPage);
router.get('/:creator', Controller.getNewsByUser);
router.put('/auth/update/:id', auth, Controller.updateNews);
router.delete('/auth/delete/:id', auth, Controller.deleteNews);

module.exports = router;