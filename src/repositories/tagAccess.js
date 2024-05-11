const dbAccess = require("./DataSource")
const { ILike } = require("typeorm");
const tagRep = dbAccess.AppDataSource.getRepository("Tag");

async function createTag(tag){
   return await tagRep.save(tag)
}

async function getAllTags(){
    return await tagRep.find();
}

async function getAllTagsByName(name){
    return await tagRep.find({
        where:{
            name
        },
   });
}

async function searchTag(text){
    return await tagRep.find({
        where:{
            name: ILike(`%${text}%`)
        }
    })
}

async function getTagById(id){
    return await tagRep.findOne({
        where:{
            id 
        },
    });
}

async function getTagByName(name){
    return await tagRep.findOne({
        where:{
            name
        },
    });
}

async function deleteTag(id){
    return await tagRep.delete({
        id
    });
}

async function updateTag(id, data){
    return await tagRep.update({ id }, data)
}

module.exports = {
    createTag,
    getAllTags,
    getAllTagsByName,
    getTagById,
    getTagByName,
    deleteTag,
    updateTag,
    searchTag
};