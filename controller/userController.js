const express = require("express");
const router = express.Router();
const User = require("../model/user");
const constants = require("../firebase_multer/constants");
const firebase = require('../firebase_multer/filebase');

router.get("/", (req, res) => {
	return User.find().exec((err, users) => {
		if (err) throw err;
		res.json(users);
	});
});

router.get("/:id", (req, res) => {
	if (!req.params.id)
		res.status(400).send({ messError: 'not found id' })
	const id = { _id: req.params.id };
	User.findById(id).exec((err, user) => {
		if (err) throw err
		res.json(user);
	})
});

router.delete("/:id", (req, res) => {
	const id = { _id: req.params.id };
	User.findByIdAndDelete(id, (err, docs) => {
		if (err) console.log(err);
		else res.json({ message: `Delete user ${req.params.id} successfully` });
	});
});

router.put("/:id", constants.upload.single("file"), async (req, res) => {
	let id = req.params.id;
	if (!req.file) {
		return res.status(400).send("Error: No files found")
	}
	const filename = 'user' + '-' + `${id}` + '-' + 'avatar'
	const blob = firebase.bucket.file(filename)

	const blobWriter = blob.createWriteStream({
		metadata: {
			contentType: req.file.mimetype
		}
	})

	blobWriter.on('error', (err) => {
		console.log(err)
	})

	blobWriter.end(req.file.buffer)
	let update = req.body;
	update.photoUrl = `https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/${encodeURIComponent(filename)}?alt=media`
	User.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
		if (err) return res.send(err);
		res.json(result);
	});
});

module.exports = router;