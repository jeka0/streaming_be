const tagService = require("../services/tagService");

async function createTag(req, res){
    const { name } = req.body;

    tagService.createTag({name})
    .then((tag)=>{res.send(tag)})
    .catch((err)=>res.status(400).send(err.message));
}

async function getTagById(req, res){
    const { id } = req.params;

    tagService.getTagById(id)
    .then((tag)=>res.send(tag))
    .catch((err)=>res.status(400).send(err.message));
}

async function getTagByName(req, res){
    const { name } = req.body;

    tagService.getTagByName(name)
    .then((tag)=>res.send(tag))
    .catch((err)=>res.status(400).send(err.message));
}

async function searchTag(req, res){
    const { name } = req.body;

    tagService.searchTags(name)
    .then((results)=>res.send(results))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllTags(req, res){
    tagService.getAllTags()
    .then((tags)=>res.send(tags))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllTagsByName(req, res){
    const { name } = req.body;

    tagService.getAllTagsByName(name)
    .then((tags)=>res.send(tags))
    .catch((err)=>res.status(400).send(err.message));
}

async function updateTag(req, res){
    const { id } = req.params;
    const { name } = req.body;

    tagService.updateTag(id, { name })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteTag(req, res){
    const { id } = req.params;

    tagService.deleteTag(id)
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = {
    createTag,
    getTagById,
    getTagByName,
    getAllTags,
    getAllTagsByName,
    updateTag,
    deleteTag,
    searchTag
};