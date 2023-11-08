const dbAccess = require("./DataSource.js")
const { ILike } = require("typeorm");
const userRep = dbAccess.AppDataSource.getRepository("User");

async function createUser(user){
   return await userRep.save(user)
}

async function getAllUsers(){
    return await userRep.find()
}

async function searchUser(text){
    return await userRep.find({
        where:{
            login: ILike(`%${text}%`)
        }
    })
}

async function getUserByID(id){
    return await userRep.findOneBy({ id })
}

async function getUserByStreamKey(streamKey){
    return await userRep.findOneBy({ streamKey })
}

async function getUserByLogin(login){
    return await userRep.findOneBy({ login })
}

async function deleteUser(id){
    return await userRep.delete({ id });
}

async function updateUser(id, data){
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