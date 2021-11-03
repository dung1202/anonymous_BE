const express = require('express')
const router = express.Router()
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(200).send({ error: 'Email already exists.' })
    }

    let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;
    let user = new User(req.body);

    user.save(err => {
        if (err) throw err
        console.log('User save successfully')
    })
    res.json({ user })
})

router.post('/signin', async (req, res) => {
    let checkPass = false;
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (user) {
        checkPass = bcrypt.compareSync(password, user.password);
    }

    if (user && checkPass) {
        const accessToken = jwt.sign({
            email: user.email,
            _id: user._id
        }, process.env.SECRET_KEY)
        return res.json({ accessToken })
    }
    res.status(400).send({
        error: 'Incorrect email or password.'
    })
})
module.exports = router