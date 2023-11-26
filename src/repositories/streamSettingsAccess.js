const dbAccess = require("./DataSource.js")
const settingsRep = dbAccess.AppDataSource.getRepository("Settings");

async function createSettings(settings){
   return await settingsRep.save(settings)
}

async function getSettingsByID(id){
    return await settingsRep.findOne({  
        where:{
            id 
        }, 
        relations:['user'] 
    })
}


async function getSettingsByUserID(userId){
    return await settingsRep.findOne({ 
        where:{
            user:{
                id: userId
            }
        }, 
        relations:['user'] 
     })
}

async function deleteSettings(id){
    return await settingsRep.delete({ id });
}

async function updateSettings(id, data){
    return await settingsRep.update({ id }, data)
}

module.exports = {
    createSettings,
    getSettingsByID,
    getSettingsByUserID,
    deleteSettings,
    updateSettings,
};