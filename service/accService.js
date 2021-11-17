const dotenv = require('dotenv');
const Model = require('../model/user');
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');
const { generateToken } = require('../helper/auth');

dotenv.config();

async function login(payload){
    const username = payload.username;
    const password = payload.password;
    const foundUser = await Model.findOne({username: username});
    if (!foundUser || !bcrypt.compareSync(password + foundUser.salt, foundUser.hash)){
        return { message:'Username or password are wrong' };
    }
    else {
        const accessToken = await generateToken({_id: foundUser._id}, process.env.SECRET_KEY, process.env.accessTokenLife);
        const { _id, hash, salt, role, ...user } = foundUser.toObject();
        return { user, accessToken };
    }
}

async function register(payload){
    const id = new Types.ObjectId();
    const username = payload.username;
    const email = payload.email;
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(payload.password + saltPassword, 10);
    const foundData = await Model.find(
        {$or: [{username: username}, {email: email}]},
        {username: 1, email: 1}
        );
    if (!foundData.length){
        const insertUser = await Model.create({
            _id: id,
            username: username,
            email: email,
            hash: hashPassword,
            salt: saltPassword,
        })
        const accessToken = await generateToken({_id: id}, process.env.SECRET_KEY, process.env.accessTokenLife);
        const { _id, hash, salt, role, ...user } = insertUser.toObject();
        return { user, accessToken };
    }
    return { message: 'Username or email already exist' };
}

module.exports = { login, register };