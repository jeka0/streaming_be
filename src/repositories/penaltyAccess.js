const dbAccess = require("./DataSource")
const penaltyRep = dbAccess.AppDataSource.getRepository("Penalty");

async function createPenalty(penalty){
   return await penaltyRep.save(penalty)
}

async function getAllPenaltys(status, type){
    const config = {
        relations:['user', 'chat', 'type', 'status'],
         order: {datetime: 'DESC'}
    }
    if(status || type){
        config.where = {};
        if(status) config.where.status = { code: status };
        if(type) config.where.type = { code: type };
    }

    return await penaltyRep.find(config);
}

async function getAllPenaltysByChat(chatId, status, type){
    const config = {
        where:{
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status'],
        order: {datetime: 'DESC'}
   }

   if(status) config.where.status = { code: status };
   if(type) config.where.type = { code: type };
    
    return await penaltyRep.find(config);
}

async function getAllPenaltysByUser(userId){
    return await penaltyRep.find({
        where:{
            user:{
                id: userId
            }
        }, 
        relations:['user', 'chat', 'type', 'status'],
        order: {datetime: 'DESC'}
   });
}

async function getAllPenaltysByUserAndChat(userId, chatId){
    return await penaltyRep.find({
        where:{
            user:{
                id: userId
            },
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status'],
        order: {datetime: 'DESC'}
   });
}

async function getPenaltyById(id){
    return await penaltyRep.findOne({
        where:{
            id 
        }, 
        relations:['user', 'chat', 'type', 'status'] 
    });
}

async function getPenaltyByUserAndChat(userId, chatId, status, type){
    const config = {
        where:{
            user:{
                id: userId
            },
            chat:{
                id: chatId
            }
        }, 
        relations:['user', 'chat', 'type', 'status'] 
    }

    if(status) config.where.status = { code: status };
    if(type) config.where.type = { code: type };
    
    return await penaltyRep.findOne(config);
}

async function deletePenalty(id){
    return await penaltyRep.delete({
        id
    });
}

async function updatePenalty(id, data){
    return await penaltyRep.update({ id }, data)
}

module.exports = {
    createPenalty,
    getAllPenaltys,
    getAllPenaltysByChat,
    getAllPenaltysByUser,
    getAllPenaltysByUserAndChat,
    getPenaltyById,
    getPenaltyByUserAndChat,
    deletePenalty,
    updatePenalty
};