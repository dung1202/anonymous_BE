const { bucket } = require('../firebase_multer/filebase');

function uploadFile(req, res, next){
    try {
      if (!req.file){
        next();
      }
      else {
        console.log(req.file)
        filename = "product-img-" + new Date(+new Date() + 5 * 60 * 60 * 1000);
        const blob = bucket.file(filename);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
    
        blobWriter.on("error", (err) => {
            if (err){
                console.log(err);
                throw { message: 'Something went wrong, please try again'}
            }
        });
    
        blobWriter.on("finish", () => {
          res.status(200).send("File uploaded.");
        });
        blobWriter.end(req.file.buffer);
        const link = `https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/${encodeURIComponent(filename)}?alt=media`;
        req.body.image = link;
        next();
      }
    }
    catch (err){
        console.log(err);
        res.status(400).send(err)
    }
}

module.exports = uploadFile;