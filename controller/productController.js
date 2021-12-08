const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const constants = require("../firebase_multer/constants");
const firebase = require("../firebase_multer/filebase");

router.get("/", (req, res) => {
  Product.find()
    .populate("userId")
    .exec((err, product) => {
      if (err) throw err;
      res.json(product);
    });
});

router.get("/:id", (req, res) => {
  if (!req.params.id) res.status(400).send({ messError: "not found id" });
  const id = { _id: req.params.id };
  Product.findById(id)
    .populate("userId")
    .exec((err, product) => {
      if (err) throw err;
      res.json(product);
    });
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) res.status(400).send({ messError: "not found id" });
  const id = { _id: req.params.id };
  Product.findByIdAndDelete(id, (err, docs) => {
    if (err) console.log(err);
    else res.json({ message: `Delete user ${req.params.id} successfully` });
  });
});

router.post("/", constants.upload.any("file"), async (req, res) => {
  const name = [];
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      let filename = "";
      if (i !== 0) {
        filename =
          "product" +
          "-" +
          `${i + 1}` +
          "-" +
          new Date(+new Date() + 5 * 60 * 60 * 1000);
      } else {
        filename =
          "product" +
          "-" +
          `img` +
          "-" +
          new Date(+new Date() + 5 * 60 * 60 * 1000);
      }
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

  let product = new Product(req.body);
  product.img = name[0];
  product.listedPrice = Number(product.listedPrice);
  product.discountPrice = Number(product.discountPrice);
  product.quantity = Number(product.quantity);
  product.sold = Number(product.sold);
  product.vote = Number(product.vote);
  update.tags = update.tags.split(" ");
  name.splice(0, 1);
  product.listphotos = name;

  product.save((err) => {
    if (err) throw err;
    console.log("File save successfully");
  });
  res.json({ data: product });
});

router.put("/:id", constants.upload.any("file"), async (req, res) => {
  const id = { _id: req.params.id };
  const update = req.body;
  console.log(req.files);
  if (req.files.length > 0) {
    const name = [];
    for (let i = 0; i < req.files.length; i++) {
      let filename = "";
      if (i !== 0) {
        filename =
          "product" +
          "-" +
          `${i + 1}` +
          "-" +
          new Date(+new Date() + 5 * 60 * 60 * 1000);
      } else {
        filename =
          "product" +
          "-" +
          `img` +
          "-" +
          new Date(+new Date() + 5 * 60 * 60 * 1000);
      }
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
    update.img = name[0];
    name.splice(0, 1);
    update.listphotos = name;
  } else {
    Product.findById(id).exec((err, product) => {
      console.log(product);
      update.img = product.img;
      update.listphotos = product.listphotos;
    });
  }
  update.listedPrice = Number(update.listedPrice);
  update.discountPrice = Number(update.discountPrice);
  update.quantity = Number(update.quantity);
  update.vote = Number(update.vote);
  update.tags = update.tags.split(" ");
  update.updateAt = Date.now(+new Date() + 7 * 60 * 60 * 1000);
  Product.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
    if (err) return res.send(err);
    res.json(result);
  });
});

module.exports = router;
