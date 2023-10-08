const userAccess = require("../repositories/userAccess");
const { getHesh } = require("../helpers/encrypt"); 
const { deleteFile } = require("../helpers/fs");

async function createUser(user){
    user.password = await getHesh(user.password);
    userAccess.createUser(user);
 }
 
 async function getAllUsers(){
    const users = await userAccess.getAllUsers();
    users.map(user=>delete user.password);
    return users;
 }

 async function searchUser(login){
  const users =  await userAccess.searchUser(login);
  users.map(user=>delete user.password);
  return users;
}
 
 async function getUserByID(id){
    const user = await userAccess.getUserByID(id);
    
    if(!user){
      throw new Error("User is not found");
    }

    return user;
 }
 
 async function getUserByLogin(login){
    return await userAccess.getUserByLogin(login);
 }
 
 async function deleteCurrentUser(id){
   const user = await userAccess.getUserByID(id);
    
    if(!user){
      throw new Error("User is not found");
    }

    deleteFile(user.image);

    return await userAccess.deleteUser(id);
 }
 
 async function updateCurrentUser(id, data){
   const user = await userAccess.getUserByID(id);
    
   if(!user){
     throw new Error("User is not found");
   }

   if(data.image)deleteFile(user.image);
   if(data.password)data.password = await getHesh(data.password);

   return await userAccess.updateUser(id, data);
 }
 
 module.exports = {
     createUser,
     getAllUsers,
     searchUser,
     getUserByID,
     getUserByLogin,
     deleteCurrentUser,
     updateCurrentUser
 };

