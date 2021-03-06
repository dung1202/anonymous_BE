const Model = require('../model/product');

var itemPerPage = 10;

async function getByTag(payload){
    const totalMatch = await Model.countDocuments({ tags: { $elemMatch: { $eq: payload.tag } }});
    const page = payload.page - 1;
    const tag = payload.tag.replace(/^%23/, '#');
    const data = await Model.find({ tags: { $elemMatch: { $eq: tag } }}, {userId: 0}).sort({createdAt: 'desc'}).limit(itemPerPage).skip(itemPerPage * page);
    if (data.length){
        return {
            totalMatch: totalMatch,
            totalPage: parseInt(totalMatch / itemPerPage) + 1,
            data: data
        };
    }
    return { message: 'product was not found' };
}

async function getByName(payload){
    const totalMatch = await Model.countDocuments({ name: { $regex: payload.name }});
    const page = payload.page - 1;
    const regex = new RegExp(payload.name.toLowerCase(), "i")
    const data = await Model.find({ name: { $regex: regex }}).sort({createdAt: 'desc'}).limit(itemPerPage).skip(itemPerPage * page);
    if (data.length){
        return {
            totalMatch: totalMatch,
            totalPage: parseInt(totalMatch / itemPerPage) + 1,
            data: data
        };
    }
    return { message: 'product was not found' };
}

module.exports = { getByTag, getByName };