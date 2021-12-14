const Model = require('../model/cart');
const { Types } = require('mongoose');
const { generateToken } = require('../helper/auth');
const dotenv = require('dotenv');

dotenv.config();

async function Cart(user_id){
    // let cart = await Model.findOne({user: user_id}).populate({ 
    //     path: 'items',
    //     populate: {
    //         path: 'product_id',
    //         model: 'Product'
    //     }})
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
    let cart = await Model.aggregate(pipeline);
<<<<<<< HEAD
    if (cart.length){
        cart = cart[0];
        cart.totalPrice = 0;
        if (cart.items.length){
            cart.items.forEach( el => {
                el.totalPrice = el.product_id.discountPrice * el.quantity;
                cart.totalPrice += el.totalPrice;
            });
            return cart;
        }
    }
    cart = { 
        items: [],
        totalPrice: 0
=======
    cart = cart[0];
    cart.totalPrice = 0;
    if (cart.items.length){
        cart.items.forEach( el => {
            el.totalPrice = el.product_id.discountPrice * el.quantity;
            cart.totalPrice += el.totalPrice;
            console.log(cart.totalPrice, el.to)
        });
        return cart;
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
    }
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
        quantity: payload.quantity
    }
<<<<<<< HEAD
=======
    console.log(product_id)
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
    await Model.updateOne({user: payload.decoded._id}, {$push: {items: item}});
    return { message: 'Add item successfully.'};
}

async function changeQty(payload){
    await Model.updateOne(
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
<<<<<<< HEAD
    await Model.updateOne({user: payload.decoded._id}, {$pull: {items: {_id: payload.id}}}, {upsert: true});
=======
    await Model.updateOne({user: payload.decoded._id}, {$pull: {items: {_id: payload.id}}});
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
    const cart = await Cart(payload.decoded._id);
    return { 
        message: 'remove item successfully.',
        cart: cart
    };
}

async function removeAll(payload){
<<<<<<< HEAD
    await Model.updateMany({user: payload.decoded._id}, {$set: {items: []}});
=======
    await Model.updateMany({user: payload.decoded._id}, {$set: {items: {}}});
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
    const cart = await Cart(payload.decoded._id);
    return { 
        message: 'remove item successfully.',
        cart: cart
    };
}

<<<<<<< HEAD
module.exports = { addItem, getCart, changeQty, removeItem, removeAll, Cart };
=======
async function checkout(payload){
    const cart = await Cart(payload.decoded._id);
    const token = generateToken({}, process.env.SECRET_KEY, 60 * 5)
    return { cart, token };
}

module.exports = { addItem, getCart, changeQty, removeItem, removeAll, checkout };
>>>>>>> 8a7ba7513dcdd1969a525842e70ef8781253e669
