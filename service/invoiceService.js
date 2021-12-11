const Model = require('../model/invoice');
const { Types } = require('mongoose');

async function create(payload){
    let insertInvoice = {
        user: Types.ObjectId(payload.decoded._id),
        deliveryAddress: payload.deliveryAddress,
        note: payload.note,
        order_items: payload.order_items
    }
    await Model.create(insertInvoice);
    return {
        message: 'Order successfully'
    }
}

module.exports = { create };