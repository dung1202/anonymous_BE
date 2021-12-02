const Service = require('../service/cartService')

async function getCart(req, res){
    try {
        const result = await Service.getCart(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function addItem(req, res){
    try {
        const result = await Service.addItem(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function changeQty(req, res){
    try {
        const result = await Service.changeQty(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function removeItem(req, res){
    try {
        const result = await Service.removeItem(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function removeAll(req, res){
    try {
        const result = await Service.removeAll(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getCart, addItem, changeQty, removeItem, removeAll };