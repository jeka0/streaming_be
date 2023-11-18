const userAccess = require("../repositories/userAccess");
const { getHesh } = require("../helpers/encrypt"); 
const { deleteFile } = require("../helpers/fs");
const { createChat, updateChat } = require("./chatService");
const { generateStreamKey } = require("../helpers/streamKey");

async function createUser(user){
    user.password = await getHesh(user.password);
    const name = await getHesh(user.login.toString());
    user.chat = await createChat({ name });
    user.streamKey = generateStreamKey();
    const streamer = await userAccess.createUser(user);

    await updateChat( user.chat.id,{ streamer });
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

    user.subscription.forEach((user, index)=>{delete user.password;})

    return user;
 }

 async function getUserByStreamKey(streamKey){
  const user = await userAccess.getUserByStreamKey(streamKey);
  
  if(!user){
    throw new Error("User is not found");
  }

  user.subscription.forEach((user, index)=>{delete user.password;})

  return user;
}
 
 async function getUserByLogin(login){
    const user = await userAccess.getUserByLogin(login);
    user.subscription.forEach((user, index)=>{delete user.password;})
    return user;
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

 async function followToUser(streamerId, followerId){
  const streamer = await getUserByID(streamerId);
  const follower = await getUserByID(followerId);

  if(!streamer){
    throw new Error("Streamer not found");
  }

  if(!follower){
      throw new Error("Follower not found");
  }

  if(!follower.subscription.some((u)=>u.id===streamer.id))follower.subscription.push(streamer);
  const updatedFollower = await userAccess.createUser(follower);
  delete updatedFollower.password;
  updatedFollower.subscription.forEach((user, index)=>{delete user.password;})
  return updatedFollower;
 }

 async function unfollowFromUser(streamerId, followerId){
  const follower = await getUserByID(followerId);

  if(!follower){
    throw new Error("Follower not found");
  }

  const index = follower.subscription.findIndex(user=>user.id==streamerId);
  if (index > -1) {
    follower.subscription.splice(index, 1);
  }
  const updatedFollower = await userAccess.createUser(follower);
  delete updatedFollower.password;
  updatedFollower.subscription.forEach((user, index)=>{delete user.password;})
  return updatedFollower;
}
 
 module.exports = {
     createUser,
     getAllUsers,
     searchUser,
     getUserByID,
     getUserByLogin,
     deleteCurrentUser,
     updateCurrentUser,
     getUserByStreamKey,
     followToUser,
     unfollowFromUser
 };

