const Model = require('../model/news');

var itemPerPage = 10;

async function createNews(payload){
    payload.creator_id = payload.decoded._id;
    let data =  await Model.create(payload);
    data = data.toObject();
    delete data.creator_id;
    return {
        message: 'create successfully',
        data: data
    };
}

async function getNews(payload){
    const data = await Model.find({_id: payload.id}, {creator_id: 0});
    if (data.length){
        return { data };
    }
    return { message: 'title was not found' };
}

async function getByTag(payload){
    const totalMatch = await Model.countDocuments({ tags: { $elemMatch: { $eq: payload.tag } }});
    const page = payload.page - 1;
    const tag = payload.tag.replace(/^%23/, '#');
    const data = await Model.find({ tags: { $elemMatch: { $eq: tag } }}, {creator_id: 0}).sort({createdAt: 'desc'}).limit(itemPerPage).skip(itemPerPage * page);
    if (data.length){
        return {
            totalMatch: totalMatch,
            totalPage: parseInt(totalMatch / itemPerPage) + 1,
            data: data
        };
    }
    return { message: 'news was not found' };
}

async function getByTitle(payload){
    const totalMatch = await Model.countDocuments({ title: { $regex: payload.title }});
    const page = payload.page - 1;
    const regex = new RegExp(payload.title.toLowerCase(), "i")
    const data = await Model.find({ title: { $regex: regex }}, { creator_id: 0}).sort({createdAt: 'desc'}).limit(itemPerPage).skip(itemPerPage * page);
    if (data.length){
        return {
            totalMatch: totalMatch,
            totalPage: parseInt(totalMatch / itemPerPage) + 1,
            data: data
        };
    }
    return { message: 'news was not found' };
}

async function getPage(payload){
    const totalNews = await Model.countDocuments();
    const page = payload.page - 1;
    const data = await Model.find({}, {creator_id: 0}).sort({createdAt: 'desc'}).limit(itemPerPage).skip(itemPerPage * page);
    return {
        totalNews: totalNews,
        totalPage: parseInt(totalNews / itemPerPage) + 1,
        data: data
    };
}

async function getNewsByUser(payload){
    if (!payload.creator) throw 'creator is required';
    const data = await Model.find({creator: payload.creator}).sort('-createdAt')
    return {data};
}

async function updateNews(payload){
    if (!payload.params.id) throw 'Something went wrong';
    const data =  await Model.findByIdAndUpdate({_id: payload.params.id}, payload.body, {new: true});
    return {
        message: 'update successfully',
        data: data
    };
}

async function deleteNews(payload){
    if (!payload.id) throw 'Something went wrong';
    const data = await Model.findByIdAndDelete({_id: payload.id}).exec( err => {
        if (err) throw err;
    });
    return {message: 'delete successfully'};
}

module.exports = {
    createNews,
    getNews,
    getByTag,
    getByTitle,
    getPage,
    getNewsByUser,
    updateNews,
    deleteNews
}