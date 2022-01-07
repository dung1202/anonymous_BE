const dotenv = require('dotenv');
const Model = require('../model/user');
const Invoice = require('../model/invoice');
const NewsLetter = require('../model/newsletters');
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');
const { generateToken } = require('../helper/auth');
const Cart = require('../model/cart');
const { validPassword } = require('../middleware/accMiddleware');
const { number } = require('../helper/random');
const transporter = require('../mail.config.js/transporter');

dotenv.config();

async function login(payload){
    const username = payload.username;
    const password = payload.password;
    const foundUser = await Model.findOne({username: username});
    if (!foundUser || !bcrypt.compareSync(password + foundUser.salt, foundUser.hash)){
        return {
            message:'Username or password are wrong'
        };
    }
    else {
        const accessToken = await generateToken({_id: foundUser._id}, process.env.SECRET_KEY, process.env.accessTokenLife);
        const { _id, hash, salt, role, ...user } = foundUser.toObject();
        return {
            message: 'Login successfully!',
            user,
            accessToken
        };
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
            role: payload.role
        })
        const accessToken = await generateToken({_id: id}, process.env.SECRET_KEY, process.env.accessTokenLife);
        const { _id, hash, salt, role, ...user } = insertUser.toObject();
        await new Cart({
            user: id,
            items: [],
            totalPrice: 0
        }).save( (err, data) => { 
            if (err) throw err;
        });
        return {
            message: 'Register successfully!',
            user,
            accessToken
        };
    }
    return {
        message: 'Username or email already exist'
    };
}

async function getProfile(payload){
    const foundUser = await Model.findById({_id: payload.decoded._id});
    const { _id, hash, salt, ...user } = foundUser.toObject();
    return {
        message: 'Get profile successfully!',
        user
    };
}

async function loginAdmin(payload){
    const username = payload.username;
    const password = payload.password;
    const foundUser = await Model.findOne({username: username});
    if (foundUser?.role !== 'admin' || !bcrypt.compareSync(password + foundUser.salt, foundUser.hash)){
        return {
            message:'Username or password are wrong'
        };
    }
    else {
        const accessToken = await generateToken({_id: foundUser._id}, process.env.SECRET_KEY, process.env.accessTokenLife);
        const { _id, hash, salt, role, ...user } = foundUser.toObject();
        return {
            message: 'Login successfully!',
            user,
            accessToken
        };
    }
}

async function changePwd(payload){
    const { oldPassword, newPassword } = payload;
    const foundUser = await Model.findById(payload.decoded._id);
    if (!validPassword(newPassword)){
        throw {error: 'Something went wrong. Please try again!'};
    }
    if (!oldPassword || !bcrypt.compareSync(oldPassword + foundUser.salt, foundUser.hash)){
        return { message: 'Wrong password' };
    }
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword + saltPassword, 10);
    await Model.findByIdAndUpdate(payload.decoded._id, {
        $set: {
            salt: saltPassword,
            hash: hashPassword
        }
    });
    return {
        message: 'Change password successfully'
    }
}

async function getInvoice(payload){
    data = await Invoice.find({user_id: payload.decoded._id}, {user_id: 0, logs: 0})
    .sort({createdAt: 'desc'})
    .populate({ 
        path: 'products',
        populate: {
            path: 'product_id',
            model: 'Product'
        }
    });
    return { data };
}

async function forgotPassword(payload){
    const OTP_Code = number(6);
    let content = `<div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #0085ff">Voucher-Hunter send verify code</h4>
            <span style="color: black">OTP Code: ${OTP_Code}</span>
        </div>
    </div>`;
    const foundUser = await Model.findOne({username: payload.username}, {email: 1});
    if (!foundUser){
        return { message: 'Cannot find user' }
    }
    let options = {
        from: process.env.email,
        to: foundUser.email,
        subject: 'Forgot password',
        html: content
    }
    transporter.sendMail(options, (err, info) => {
        if (err){
            console.log(err);
        }
        else {
            console.log('Message sent: ' +  info.response);
        }
    })
    return {
        message: "We've send a mail contain OTP Code verify to email of account",
        OTP_Code: OTP_Code
    };
}

async function changePwdAfterVerifyOTP(payload){
    const username = payload.username
    const newPassword = payload.newPassword;
    if (!validPassword(payload.newPassword)){
        throw {error: 'Something went wrong. Please try again!'};
    }
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword + saltPassword, 10);
    await Model.findOneAndUpdate({ username }, {
        $set: {
            salt: saltPassword,
            hash: hashPassword
        }
    });
    return {
        message: 'Change password successfully'
    }
}

async function sendNewsLetter(payload){
    const content = payload.content;
    let foundEmails = await Model.find({ subscribeToNewsLetter: true }, { email: 1, _id: 0 });
    console.log(foundEmails)
    let emails = foundEmails.map( el => el.email );
    let options = {
        from: process.env.email,
        to: emails,
        subject: 'News Letter',
        html: content
    }
    transporter.sendMail(options, (err, info) => {
        if (err){
            console.log(err);
        }
        else {
            console.log('Message sent: ' +  info.response);
        }
    })
    await NewsLetter.create({ user_id: payload.decoded._id, emails, content});
    return {
        message: 'Send newsletter successfully',
    }
}

module.exports = { login, register, getProfile, loginAdmin, changePwd, sendNewsLetter, getInvoice, forgotPassword, changePwdAfterVerifyOTP };
