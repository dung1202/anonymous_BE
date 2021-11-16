const Service = require('../service/newsService')

async function createNews(req, res){
    try {
        const result = await Service.createNews(req.body);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function getNews(req, res){
    try {
        const result = await Service.getNews(req.params);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function getPage(req, res){
    try {
        const result = await Service.getPage(req.query);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function getNewsByUser(req, res){
    try {
        const result = await Service.getNewsByUser(req.params);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function updateNews(req, res){
    try {
        const result = await Service.updateNews(req);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function deleteNews(req, res){
    try {
        const result = await Service.deleteNews(req.params);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = {
    createNews,
    getNews,
    getPage,
    getNewsByUser,
    updateNews,
    deleteNews
}