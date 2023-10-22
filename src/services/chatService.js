const chatAccess = require("../repositories/chatAccess");
const { getUserByID } = require("./userService");
const { getHesh } = require("../helpers/encrypt");

async function createChat(chat){
    if(chat.name){
        if(await chatAccess.getChatByName(chat.name)){
          throw new Error("A chat with the same name already exists");
        }
    }else{
      chat.name = await getHesh((new Date).toString());
    }

    if(chat.users)chat.users = JSON.parse(chat.users)

    return chatAccess.createChat(chat);
 }
 
 async function getAllChats(){
    const chats = await chatAccess.getAllChats();

    chats.forEach(chat=>deleteInfo(chat));

    return chats;
 }

 async function getUserChats(userId){
  const chats = await chatAccess.getUserChats(userId);

  chats.forEach(chat=>deleteInfo(chat));

  return chats;
}

 async function searchChat(name){
  return await chatAccess.searchChat(name);
  }
 
 async function getChatByID(id){
    const chat = await chatAccess.getChatByID(id);
    
    if(!chat){
      throw new Error("Chat is not found");
    }

    deleteInfo(chat);

    return chat;
 }
 
 async function getChatByName(name){
    const chat = await chatAccess.getChatByName(name);

    if(!chat){
        throw new Error("Chat is not found");
      }

      deleteInfo(chat)
  
      return chat;
 }
 
 async function deleteChat(id){
   const chat = await chatAccess.getChatByID(id);
    
    if(!chat){
      throw new Error("Chat is not found");
    }

    return await chatAccess.deleteChat(id);
 }
 
 async function updateChat(id, data){
   const chat = await chatAccess.getChatByID(id);
    
   if(!chat){
     throw new Error("Chat is not found");
   }

   if(data.name){
      if(await chatAccess.getChatByName(data.name)){
        throw new Error("A chat with the same name already exists");
      }
   }
   if(data.users)data.users = JSON.parse(data.users)

   const {users, ...updateData} = data;

   await chatAccess.updateChat(id, updateData);
   if(users)await chatAccess.createChat({id:chat.id, users})
 }

 async function joinUser(id, userId){
  const chat = await chatAccess.getChatByID(id);
  const user = await getUserByID(userId);

  if(!chat){
    throw new Error("Chat not found");
  }

  if(!user){
      throw new Error("User not found");
  }

  if(!chat.users.some((u)=>u.id===user.id))chat.users.push(user);
  const updatedchat = await chatAccess.createChat(chat);
  deleteInfo(updatedchat);
  return updatedchat;
 }

 async function leaveUser(id, userId){
  const chat = await chatAccess.getChatByID(id);

  if(!chat){
    throw new Error("Chat not found");
  }

  const index = chat.users.findIndex(user=>user.id===userId);
  if (index > -1) {
    chat.users.splice(index, 1);
  }
  const updatedChat = await chatAccess.createChat(chat);
  deleteInfo(updatedChat);
  return updatedChat;
}

 function deleteInfo(chat){
  chat.users.forEach((user, index)=>{chat.users[index] = {id:user.id}})
}
 
 module.exports = {
    createChat,
    getAllChats,
    getUserChats,
    searchChat,
    getChatByID,
    getChatByName,
    deleteChat,
    updateChat,
    joinUser,
    leaveUser
 };

