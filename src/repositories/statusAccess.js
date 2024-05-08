const dbAccess = require("./DataSource")
const statusRep = dbAccess.AppDataSource.getRepository("Status");

async function createStatus(status){
   return await statusRep.save(status)
}

async function getAllStatuses(){
    return await statusRep.find();
}

async function getAllStatusesByCode(code){
    return await statusRep.find({
        where:{
            code
        },
   });
}

async function getStatusById(id){
    return await statusRep.findOne({
        where:{
            id 
        },
    });
}

async function getStatusByCode(code){
    return await statusRep.findOne({
        where:{
            code
        },
    });
}

async function deleteStatus(id){
    return await statusRep.delete({
        id
    });
}

async function updateStatus(id, data){
    return await statusRep.update({ id }, data)
}

module.exports = {
    createStatus,
    getAllStatuses,
    getAllStatusesByCode,
    getStatusById,
    getStatusByCode,
    deleteStatus,
    updateStatus
};