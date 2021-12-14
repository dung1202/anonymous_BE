const Model = require('../model/invoice');
const { Cart, removeAll } = require('../service/cartService');
const { Types } = require('mongoose');

async function create(payload){
    const originData = await Cart(payload.decoded._id);
    if (originData?.items.length == payload.order_items.length){
        for (let i = 0; i < originData.items.length; i++) {
            if (originData.items[i].product_id._id == payload.order_items[i].product_id._id){
                if (originData.items[i].totalPrice != payload.order_items[i].totalPrice){
                    throw { message: 'Something went wrong, please try again.'};
                }
            }
        }
    }
    else {
        throw { message: 'Something went wrong, please try again.'};
    }
    const insertInvoice = {
        user: Types.ObjectId(payload.decoded._id),
        deliveryAddress: payload.deliveryAddress,
        note: payload.note,
        payment: payload.payment,
        order_items: payload.order_items
    }
    await Model.create(insertInvoice);
    await Model.updateMany({user: payload.decoded._id}, {$pull: {items: []}});
    return {
        message: 'Order successfully',
    }
}

async function search(payload){
    const page = payload.query.page - 1;
    const itemPerPage = 10;
    const createAt = payload.query.createAt || 'desc'
    let data;
    if (payload.query.sortby == 'user_id'){
        data = await Model.findById(payload.body.user_id).sort({createdAt: createAt}).limit(itemPerPage).skip(itemPerPage * page);
    }
    if (!payload.query.sortby){
        data = await Model.find({}).sort({createdAt: createAt}).limit(itemPerPage).skip(itemPerPage * page);
    }
    data = await Model.find({isPay: payload.query.sortby}).sort({createdAt: createAt}).limit(itemPerPage).skip(itemPerPage * page);
    return data;
}

async function getInvoice(payload){
    const data = await search(payload);
    return { data };
}

async function update(payload){
    await Model.findByIdAndUpdate(payload.body.id, 
        {
            $set: {
                isPay: payload.body.isPay,
                updatedAt: new Date(+new Date() + 5*60*60*1000)
            }
        });
    const data = await search(payload);
    return { 
        message: 'Update successfully',
        data: data
    };
}

async function deleteOne(payload){
    await Model.findByIdAndDelete(payload.body.id);
    const data = await search(payload);
    return { 
        message: 'delete successfully',
        data: data
    };
}

module.exports = { create, getInvoice, update, deleteOne };
