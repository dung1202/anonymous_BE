const Service = require('../service/accService');

async function login(req, res){
    try {
        const result = await Service.login(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function register(req, res){
    try {
        const result = await Service.register(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);  
    }
}

async function getProfile(req, res){
    try {
        const result = await Service.getProfile(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function checkToken(req, res){
    try {
        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { login, register, getProfile, checkToken };