const Model = require('../model/news');
const { bucket } = require("../firebase_multer/filebase");

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
    const data = await Model.find({_id: payload.id});
    if (data.length){
        return {data};
    }
    return {message: 'title was not found'};
}

async function getPage(payload){
    const totalNews = await Model.countDocuments();
    const page = payload.page - 1;
    const itemPerPage = 10;
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
    getPage,
    getNewsByUser,
    updateNews,
    deleteNews
}