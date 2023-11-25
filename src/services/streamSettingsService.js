const settingsAccess = require("../repositories/streamSettingsAccess");

async function createSettings(userId, settings){
    settings.user = { id: userId};
    const streamer = await settingsAccess.createSettings(settings);
 }
 
 async function getSettingsByID(id){
    const settings = await settingsAccess.getSettingsByID(id);
    
    if(!settings){
      throw new Error("Settings is not found");
    }

    delete settings.user.password;

    return settings;
 }
 
 async function getSettingsByUserId(userId){
    const settings = await settingsAccess.getSettingsByUserID(userId);
    delete settings?.user.password;
    return settings;
 }
 
 async function deleteSettings(id){
   const settings = await settingsAccess.getSettingsByID(id);
    
    if(!settings){
      throw new Error("Settings is not found");
    }

    return await settingsAccess.deleteSettings(id);
 }
 
 async function updateSettings(id, data){
   const settings = await settingsAccess.getSettingsByID(id);
    
   if(!settings){
     throw new Error("Settings is not found");
   }

   return await settingsAccess.updateSettings(id, data);
 }
 
 module.exports = {
     createSettings,
     getSettingsByID,
     getSettingsByUserId,
     deleteSettings,
     updateSettings,
 };

