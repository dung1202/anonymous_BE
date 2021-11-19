function validUsername(username){
    return /^\w{8,30}$/.test(username);
}

function validPassword(password){
    return /^\w{8,30}$/.test(password);
}

function validEmail(email){
    return /^([.\w]+)@(gmail.com|yahoo.com)$/.test(email);
}

function login(req, res, next){
    try {
        const payload = req.body;
        if (!validUsername(payload.username)){
            throw {error: 'Something went wrong. Please try again!'};
        }
        if (!validPassword(payload.password)){
            throw {error: 'Something went wrong. Please try again!'};
        }
        next();
    }
    catch(err) {
        console.log(err);
        res.status(401).send(err);
    }
}

function register(req, res, next){
    try {
        const payload = req.body;
        if (!validUsername(payload.username)){
            throw {error: 'Something went wrong. Please try again!'};
        }
        if (!validPassword(payload.password)){
            throw {error: 'Something went wrong. Please try again!'};
        }
        if (!validEmail(payload.email)){
            throw {error: 'Something went wrong. Please try again!'};
        }
        next();
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { login, register }