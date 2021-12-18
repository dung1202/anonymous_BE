const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');

dotenv.config();

async function generateToken(payload, secretKey, tokenLife){
    const token = await jwt.sign(payload, secretKey, {expiresIn: tokenLife});
    return token;
}

async function verifyToken(token, secretKey){
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
}

async function auth(req, res, next){
    let accessToken = req.headers.authorization

    if (!accessToken){
        res.status(403).send({error: 'No token provided'});
    }
    else {
        try {
            accessToken = accessToken.replace('Bearer ', '');
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

async function authAdmin(req, res, next){
    let accessToken = req.headers.authorization

    if (!accessToken){
        res.status(403).send({error: 'No token provided'});
    }
    else {
        try {
            accessToken = accessToken.replace('Bearer ', '');
            req.body.decoded = await verifyToken(accessToken, process.env.SECRET_KEY);
            const foundUser = await User.findById({_id: req.body.decoded._id}, {_id: 1, username: 1, role: 1});
            if (foundUser?.role !== 'admin') throw {error: 'Unauthorized'};
            next();
        }
        catch(err) {
            console.log(err);
            res.status(401).send({error: 'Unauthorized'});
        }
    }
}

module.exports = { generateToken, auth, authAdmin };