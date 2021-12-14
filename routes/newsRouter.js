const router = require('express').Router();
const Controller = require('../controller/newsController');
const { auth } = require('../helper/auth');
const { upload } = require('../firebase_multer/constants');
const uploadFile = require('../middleware/newsMiddleware');

router.post('/auth/create', auth, upload.any('file'), uploadFile, Controller.createNews);
router.get('/:id', Controller.getNews);
router.get('', Controller.getPage);
router.get('/:creator', Controller.getNewsByUser);
router.put('/auth/update/:id', auth, upload.any('file'), uploadFile, Controller.updateNews);
router.delete('/auth/delete/:id', auth, Controller.deleteNews);

module.exports = router;