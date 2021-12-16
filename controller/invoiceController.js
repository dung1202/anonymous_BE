const Service = require('../service/invoiceService')

async function create(req, res){
    try {
        const result = await Service.create(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function getInvoice(req, res){
    try {
        const result = await Service.getInvoice(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).sensd(err);
    }
}

async function update(req, res){
    try {
        const result = await Service.update(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { create, getInvoice, update };
