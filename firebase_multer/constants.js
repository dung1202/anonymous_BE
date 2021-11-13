const multer  = require('multer')
const storage = multer.memoryStorage();

var upload = multer({ storage: storage });

module.exports = {
    upload
};