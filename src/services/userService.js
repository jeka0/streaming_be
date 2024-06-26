const userAccess = require("../repositories/userAccess");
const { getHesh } = require("../helpers/encrypt"); 
const { deleteFile, renameDir } = require("../helpers/fs");
const { createChat, updateChat } = require("./chatService");
const { generateStreamKey } = require("../helpers/streamKey");
const { createSettings } = require('./streamSettingsService');
const { getTagByName, getTagById } = require('./tagService');
const { getRoleByName } = require('./roleService')

async function createUser(user){
    user.password = await getHesh(user.password);
    const name = await getHesh(user.login.toString());
    user.chat = await createChat({ name });
    user.streamKey = generateStreamKey();
    user.role = await getRoleByName('User');
    const streamer = await userAccess.createUser(user);

    await updateChat( user.chat.id,{ streamer });
    await createSettings(user.id, {stream_title:"The stream has started!!!!", category: "Just chatting"})
 }

 async function generateNewStreamKey(userId){
    const streamKey = generateStreamKey();
    return await userAccess.updateUser(userId, { streamKey });
 }
 
 async function getAllUsers(){
    const users = await userAccess.getAllUsers();
    users.map(user=>deleteInfo(user));
    return users;
 }

 async function paginationUsers(skip, take, data){
    const result = await userAccess.paginationUsers(skip, take, data);
    result.data.map(user=>deleteInfo(user));
    return result
 }

 async function searchUser(login){
  const users =  await userAccess.searchUser(login);
  users.map(user=>deleteInfo(user));
  return users;
}
 
 async function getUserByID(id){
    const user = await userAccess.getUserByID(id);
    
    if(!user){
      throw new Error("User is not found");
    }
    user.subscription.forEach((user, index)=>{deleteInfo(user)})

    return user;
 }

 async function getUserByStreamKey(streamKey){
  const user = await userAccess.getUserByStreamKey(streamKey);
  
  if(!user){
    throw new Error("User is not found");
  }

  user.subscription.forEach((user, index)=>{deleteInfo(user)})

  return user;
}
 
 async function getUserByLogin(login){
    const user = await userAccess.getUserByLogin(login);
    user?.subscription.forEach((user, index)=>{deleteInfo(user)})
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

 async function update(user){
  return userAccess.createUser(user);
 }
 
 async function updateCurrentUser(id, data){
   const user = await userAccess.getUserByID(id);
    
   if(!user){
     throw new Error("User is not found");
   }

   if(user.status){
    throw new Error("You can't update your login while streaming");
   }

   if(data.login){
    const u = await getUserByLogin(data.login);
    if(u && u.login != user.login){
      throw new Error("This login is already in use by another account");
    }

    renameDir(user.login, data.login).then(()=>console.log("Directory successfully updated"))
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
  updatedFollower.subscription.forEach((user, index)=>{deleteInfo(user)})
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
  updatedFollower.subscription.forEach((user, index)=>{deleteInfo(user)})
  return updatedFollower;
}

async function addTag(userId, tagName){
  const user = await userAccess.getUserByID(userId);

  if(!user){
    throw new Error("User is not found");
  }

  const tag = await getTagByName(tagName);
  if(!user.tags.some((t)=>t.id===tag.id)){
    user.tags.push(tag);
  }else{
    throw new Error("Tag already added");
  }
  const updatedUser = await userAccess.createUser(user);
  delete updatedUser.password;
  updatedUser.subscription.forEach((user, index)=>{deleteInfo(user)})
  return updatedUser;
}

async function removeTag(userId, tagId){
  const user = await userAccess.getUserByID(userId);

  if(!user){
    throw new Error("User is not found");
  }

  const index = user.tags.findIndex(tag=>tag.id==tagId);
  if (index > -1) {
    user.tags.splice(index, 1);
  }else{
    throw new Error("This tag has not been added");
  }
  const updatedUser = await userAccess.createUser(user);
  delete updatedUser.password;
  updatedUser.subscription.forEach((user, index)=>{deleteInfo(user)})
  return updatedUser;
}

function deleteInfo(user){
  delete user.password;
  delete user.streamKey;
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
     unfollowFromUser,
     generateNewStreamKey,
     update,
     addTag,
     removeTag,
     paginationUsers
 };

