const { Cart_Model } = require('../model/cart');
const { Types } = require('mongoose');
const { generateToken } = require('../helper/auth');
const dotenv = require('dotenv');

dotenv.config();

async function Cart(user_id){
    const pipeline = [
        {
            $match: {
                user: Types.ObjectId(user_id)
            }
        },
        {
            $unwind: {
                path: '$items'
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product_id',
                foreignField: '_id',
                as: 'items.product_id'
            }
        },
        {
            $unwind: {
                path: '$items.product_id'
            }
        },
        {
            $group: {
                _id: '$_id',
                items: {
                    $push: '$items'
                }
            }
        }
    ]
    let cart = await Cart_Model.aggregate(pipeline);
    if (cart.length){
        cart = cart[0];
        cart.totalPrice = 0;
        cart.items.forEach( el => {
            el.totalPrice = el.product_id.discountPrice * el.quantity;
            cart.totalPrice += el.totalPrice;
        });
        return cart;
    }
    cart.totalPrice = 0;
    return cart;
}

async function getCart(payload){
    const cart = await Cart(payload.decoded._id);
    return { cart };
}

async function addItem(payload){
    const product_id = Types.ObjectId(payload.product_id);
    const item = {
        product_id: product_id,
        quantity: 1,
    }
    await Cart_Model.updateOne({user: payload.decoded._id}, {$push: {items: item}}, {upsert: true});
    return { message: 'Add item successfully.'};
}

async function changeQty(payload){
    await Cart_Model.updateOne(
        {'items._id': payload.id},
        {
            $set: {
                'items.$.quantity': payload.quantity,
            }
        },
    );
    const cart = await Cart(payload.decoded._id);
    return { 
        message: 'Change quantity successfully.',
        cart: cart
    };
}

async function removeItem(payload){
    await Cart_Model.updateOne({user: payload.decoded._id}, {$pull: {items: {_id: payload.id}}});
    const cart = await Cart(payload.decoded._id);
    return { 
        message: 'remove item successfully.',
        cart: cart
    };
}

async function removeAll(payload){
    await Cart_Model.updateMany({user: payload.decoded._id}, {$set: {items: {}}});
    const cart = await Cart(payload.decoded._id);
    return { 
        message: 'remove item successfully.',
        cart: cart
    };
}

async function checkout(payload){
    const cart = await Cart(payload.decoded._id);
    const token = generateToken({}, process.env.SECRET_KEY, 60 * 5)
    return { cart, token };
}

module.exports = { addItem, getCart, changeQty, removeItem, removeAll, checkout };