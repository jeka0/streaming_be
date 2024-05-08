const dbAccess = require("./DataSource")
const typeRep = dbAccess.AppDataSource.getRepository("Type");

async function createType(type){
   return await typeRep.save(type)
}

async function getAllTypes(){
    return await typeRep.find();
}

async function getAllTypesByCode(code){
    return await typeRep.find({
        where:{
            code
        },
   });
}

async function getTypeById(id){
    return await typeRep.findOne({
        where:{
            id 
        },
    });
}

async function getTypeByCode(code){
    return await typeRep.findOne({
        where:{
            code
        },
    });
}

async function deleteType(id){
    return await typeRep.delete({
        id
    });
}

async function updateType(id, data){
    return await typeRep.update({ id }, data)
}

module.exports = {
    createType,
    getAllTypes,
    getAllTypesByCode,
    getTypeById,
    getTypeByCode,
    deleteType,
    updateType
};