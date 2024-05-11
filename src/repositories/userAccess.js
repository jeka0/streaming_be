const dbAccess = require("./DataSource.js");
const userRep = dbAccess.AppDataSource.getRepository("User");

async function createUser(user){
    console.log(user + "s")
   return await userRep.save(user)
}

async function getAllUsers(){
    return await userRep.find()
}

async function searchUser(text){
    return await userRep.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .where("user.login ILIKE :text", { text: `%${text}%` })
    .orWhere("tags.name ILIKE :text", { text: `%${text}%` })
    .getMany();
}

async function getUserByID(id){
    return await userRep.findOne({  
        where:{
            id 
        }, 
        relations:['chat', 'subscription', 'tags'] 
    })
}

async function getUserByStreamKey(streamKey){
    return await userRep.findOne({ 
        where:{
            streamKey 
        }, 
        relations:['chat', 'subscription', 'tags'] 
     })
}

async function getUserByLogin(login){
    return await userRep.findOne({ 
        where:{
            login 
        }, 
        relations:['chat', 'subscription', 'tags'] 
     })
}

async function deleteUser(id){
    return await userRep.delete({ id });
}

async function updateUser(id, data){
    console.log(data)
    return await userRep.update({ id }, data)
}

module.exports = {
    createUser,
    searchUser,
    getAllUsers,
    getUserByID,
    getUserByLogin,
    deleteUser,
    updateUser,
    getUserByStreamKey
};