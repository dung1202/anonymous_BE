const CHARSET = {
    NUMBER : "0123456789",
    UPPERCASE : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

function randomString(length , method){
    let result = '';
    for (let i = 0; i < length; i++){
        result += method.charAt(Math.floor(Math.random() * method.length))
    }
    return result;
}

function number(length){
    return randomString(length, CHARSET.NUMBER)
}

function upperCase(length){
    return randomString(length, CHARSET.UPPERCASE)
}
module.exports = { number, upperCase }