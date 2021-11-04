const express = require("express");
const router = express.Router();
const User_Profile = require("./model/user_profile");
const constants = require("./constants");

router.get("/", (req, res) => {
    return User_Profile.find().exec((err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

router.get("/:id", (req, res) => {
    if (!req.params.id)
        return res.status(400).send({ error: "request user id" });
    const id = { _id: req.params.id };
    return User_Profile.findById(id).exec((err, user) => {
        if (err) throw err;
        res.json(user);
    });
});

router.put("/:id", async (req, res) => {
    const id = { _id: req.params._id };
    const update = req.body;

    await User_Profile.findByIdAndUpdate(id, update, { new: true }, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

router.delete("/:id", (req, res) => {
    const id = { _id: req.params.id };
    User_Profile.findByIdAndDelete(id, (err, docs) => {
        if (err) console.log(err);
        else res.json({ message: `Delete user profile ${req.params.id} successfully` });
    });
});

router.post("/avatar", constants.upload.single("file"), async (req, res) => {
    let id = req.authenticateUser._id;
    let update = req.body;
    update.avatar = req.file.originalname
    User_Profile.findByIdAndUpdate(id, update, { new: true }, function (err, result) {
        if (err) return res.send(err);
        res.json(result);
    }
    );
});

module.exports = router;