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

<<<<<<< HEAD
async function getInvoice(req, res){
    try {
        const result = await Service.create(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).sensd(err);
    }
}

async function update(req, res){
    try {
        const result = await Service.create(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).sensd(err);
    }
}

async function deleteOne(req, res){
    try {
        const result = await Service.create(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).sensd(err);
    }
}

module.exports = { create, getInvoice, update, deleteOne };
=======
module.exports = { create };
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
