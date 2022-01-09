const Model = require('../model/invoice');
const Cart_Model = require('../model/cart');
const { Cart } = require('../service/cartService');
const { Types } = require('mongoose');

async function create(payload){
    let originData = await Cart(payload.decoded._id);
    let totalListPrice = 0;
    let totalDiscountPrice = 0;
    let products = [];
    if (originData?.items?.length == payload.items.length){
        for (let i = 0; i < originData.items.length; i++) {
            if (
                originData.items[i].quantity === payload.items[i].quantity &&
                originData.items[i].product_id._id.toString() === payload.items[i].product_id._id &&
                originData.items[i].product_id.listedPrice === payload.items[i].product_id.listedPrice &&
                originData.items[i].product_id.discountPrice === payload.items[i].product_id.discountPrice
            ){
                originData.items[i].discountPrice = originData.items[i].product_id.discountPrice * originData.items[i].quantity;
                originData.items[i].listPrice = originData.items[i].product_id.listedPrice * originData.items[i].quantity;
                totalDiscountPrice += originData.items[i].discountPrice;
                totalListPrice += originData.items[i].listPrice
                let { __v, totalPrice, ...data } = originData.items[i];
                products.push(data)
            }
            else {
                throw { message: 'Something went wrong, please try again.'};
            }
        }
    }
    else {
        throw { message: 'Something went wrong, please try again.'};
    }
    const insertInvoice = {
        user_id: Types.ObjectId(payload.decoded._id),
        products: products,
        totalListPrice: totalListPrice,
        totalDiscountPrice: totalDiscountPrice,
        paymentMethod: payload.paymentMethod,
        deliveryAddress: payload.deliveryAddress,
        note: payload.note,
        paymentMethod: payload.paymentMethod,
    }
    await Model.create(insertInvoice);
    await Cart_Model.updateMany({user: payload.decoded._id}, {$pull: {items: {}}});
    return {
        message: 'Order successfully',
    }
}

async function search(payload){
    const page = payload.query.page - 1;
    const itemPerPage = 10;
    const sort = payload.query.sort || 'desc'
    const search = payload.query.search || 'all'
    let data;
    let totalMatch;
    if (search === 'user_id'){
        totalMatch = await Model.countDocuments({user_id: payload.body.user_id});
        data = await Model.find({user_id: payload.body.user_id})
        .sort({createdAt: sort}).limit(itemPerPage).skip(itemPerPage * page);
    }
    else if (search === 'all'){
        totalMatch = await Model.countDocuments({});
        data = await Model.find({})
        .sort({createdAt: sort})
        .limit(itemPerPage)
        .skip(itemPerPage * page)
        .populate({ 
            path: 'products',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        });
    }
    else {
        totalMatch = await Model.countDocuments({[search]: payload.query.status});
        data = await Model.find({[search]: payload.query.status})
        .sort({createdAt: sort})
        .limit(itemPerPage)
        .skip(itemPerPage * page)
        .populate({ 
            path: 'products',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        });
    }
    return { 
        totalMatch,
        totalPage: parseInt(totalMatch / itemPerPage) + 1,
        data
    };
}

async function getInvoice(payload){
    const data = await search(payload);
    return data;
}

async function update(payload){
    const { changeAction } = payload.body;
    if (changeAction?.length === 3){
        if (changeAction[0] === 'paymentMethod' || changeAction[0] === 'paymentStatus' || changeAction[0] === 'status' || changeAction[0] === 'deliveryAddress' || changeAction[0] === 'note'){
            await Model.findByIdAndUpdate(payload.body.id, {
                    $set: {
                        [changeAction[0]]: changeAction[1],
                    },
                    $push: {
                        logs: {
                            user_id: Types.ObjectId(payload.body.decoded._id),
                            changeAction: changeAction,
                            updatedAt: new Date(+new Date() + 7*60*60*1000)
                        }
                    }
                })
            const data = await search(payload);
            return data;
        }
    }
    throw { message: 'invalid request' };
}

module.exports = { create, getInvoice, update };
