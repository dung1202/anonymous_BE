const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');

dotenv.config();

async function verifyToken(token, secretKey){
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
}

async function auth(req, res, next){
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    if (!accessToken){
        res.status(403).send({error: 'No token provided'});
    }
    else {
        try {
            req.body.decoded = await verifyToken(accessToken, process.env.SECRET_KEY);
            const foundUser = await User.findById({_id: req.body.decoded._id}, {_id: 1, username: 1});
            if (!foundUser) throw {error: 'Unauthorized'};
            next();
        }
        catch(err) {
            console.log(err);
            res.status(401).send({error: 'Unauthorized'});
        }
    }
}

module.exports = auth;