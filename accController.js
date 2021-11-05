const express = require('express')
const router = express.Router()
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({ username: req.body.username })
    if (emailExist) {
        return res.status(200).send({ error: 'username already exists.' })
    }
    if (req.body.salt > 15 || req.body.salt < 1)
    {
        return res.status(200).send({ error: 'salt from 1 to 15' })
    }
        let hashPassword = await bcrypt.hash(req.body.hash, req.body.salt || 10);
    req.body.hash = hashPassword;
    let user = new User(req.body);

    // user.save(err => {
    //     if (err) throw err
    //     console.log('User save successfully')
    // })
    res.json({ user })
})

router.post('/login', async (req, res) => {
    let checkPass = false;
    const { username, hash } = req.body
    const user = await User.findOne({ username: username })

    if (user) {
        checkPass = bcrypt.compareSync(hash, user.hash);
    }

    if (user && checkPass) {
        const accessToken = jwt.sign({
            username: user.username,
            _id: user._id
        }, process.env.SECRET_KEY)
        return res.json({ accessToken })
    }
    res.status(400).send({
        error: 'Incorrect email or password.'
    })
})
module.exports = router