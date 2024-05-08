const typeAccess = require("../repositories/typeAccess");
async function createType(data){
    const type = await typeAccess.createType(data)

    if(!type){
        throw new Error("Error creating Type");
    }

    return type;
}

async function getTypeById(id){
    const type = await typeAccess.getTypeById(id);

    if(!type){
        throw new Error("Type not found");
    }

    return type;
}

async function getTypeByCode(code){
    let type = await typeAccess.getTypeByCode(code);

    if(!type){
        type = createType({code});
    }

    return type;
}

async function getAllTypes()
{
    return await typeAccess.getAllTypes()
}

async function getAllTypesByCode(code){
    return await typeAccess.getAllTypesByCode(code);
}

async function updateType(id, data){
    const updatedType = await typeAccess.updateType(id, data);

    if(!updatedType){
        throw new Error("Error updating Type");
    }

    return updatedType;
}

async function deleteType(id){
    const type = await typeAccess.getTypeById(id);
    
    if(!type){
      throw new Error("Type is not found");
    }

    return await typeAccess.deleteType(id);
}

module.exports = {
    createType,
    getTypeById,
    getTypeByCode,
    getAllTypes,
    getAllTypesByCode,
    updateType,
    deleteType
};