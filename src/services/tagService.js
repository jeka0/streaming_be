const tagAccess = require("../repositories/tagAccess");
async function createTag(data){
    const tag = await tagAccess.createTag(data)

    if(!tag){
        throw new Error("Error creating Tag");
    }

    return tag;
}

async function getTagById(id){
    const tag = await tagAccess.getTagById(id);

    if(!tag){
        throw new Error("Tag not found");
    }

    return tag;
}

async function searchTags(text){
    return await tagAccess.searchTag(text);
}

async function getTagByName(name){
    let tag = await tagAccess.getTagByName(name);

    if(!tag){
        tag = createTag({name});
    }

    return tag;
}

async function getAllTags()
{
    return await tagAccess.getAllTags()
}

async function getAllTagsByName(name){
    return await tagAccess.getAllTagsByName(name);
}

async function updateTag(id, data){
    const updatedTag = await tagAccess.updateTag(id, data);

    if(!updatedTag){
        throw new Error("Error updating Tag");
    }

    return updatedTag;
}

async function deleteTag(id){
    const tag = await tagAccess.getTagById(id);
    
    if(!tag){
      throw new Error("Tag is not found");
    }

    return await tagAccess.deleteTag(id);
}

module.exports = {
    createTag,
    getTagById,
    getTagByName,
    getAllTags,
    getAllTagsByName,
    updateTag,
    deleteTag,
    searchTags
};