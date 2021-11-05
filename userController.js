const express = require("express");
const router = express.Router();
const User = require("./model/user");

router.get("/", (req, res) => {
	return User.find().exec((err, users) => {
		if (err) throw err;
		res.json(users);
	});
});

router.get("/:id", (req, res) => {
	if (!req.params.id)
		return res.status(400).send({ error: "request user id" });

	const id = { _id: req.params.id };

	return User.findById(id).exec((err, user) => {
		if (err) throw err;
		res.json(user);
	});
});

router.put("/:id", async (req, res) => {
	const id = { _id: req.params._id };
	const update = req.body;

	await User.findByIdAndUpdate(id, update, { new: true }, (err, result) => {
		if (err) return res.send(err);
		res.json(result);
	});
});

router.delete("/:id", (req, res) => {
	const id = { _id: req.params.id };
	User.findByIdAndDelete(id, (err, docs) => {
		if (err) console.log(err);
		else res.json({ message: `Delete user ${req.params.id} successfully` });
	});
});

module.exports = router;