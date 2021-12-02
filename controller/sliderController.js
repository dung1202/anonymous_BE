const express = require("express");
const router = express.Router();
const Slider = require("../model/slider");
const constants = require("../firebase_multer/constants");
const firebase = require("../firebase_multer/filebase");

router.get("/", (req, res) => {
  const id = { _id: "61a7762895001f8c905c5b5b" };
  Slider.findById(id).exec((err, slider) => {
    if (err) throw err;
    res.json(slider);
  });
});

router.put("/", constants.upload.any("file"), async (req, res) => {
  const id = { _id: "61a7762895001f8c905c5b5b" };
  const name = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const filename = "";
      filename = "Slider" + "-" + `${i + 1}`;
      const link = `https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/${encodeURIComponent(
        filename
      )}?alt=media`;
      name.push(link);
      const blob = firebase.bucket.file(filename);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.files[i].mimetype,
        },
      });

      blobWriter.on("error", (err) => {
        return console.log(err);
      });

      blobWriter.on("finish", () => {
        res.status(200).send("File uploaded.");
      });

      blobWriter.end(req.files[i].buffer);
    }
  }
  const update = req.body;
  update.listphotos = name;

  update.updateAt = Date.now(+new Date() + 7 * 60 * 60 * 1000);
  Slider.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
    if (err) return res.send(err);
    res.json(result);
  });
});

module.exports = router;
