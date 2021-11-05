const jwt = require('jsonwebtoken')
const User = require('../model/user')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            if (err) return res.sendStatus(403);
            const user = await User.findById(payload._id).exec()
            req.authenticateUser = user
            next()
        })
    } else
        res.sendStatus(401)
}

module.exports = { authenticateJWT }