const settingsAccess = require("../repositories/streamSettingsAccess");
const { getCategoryByName } = require("./categoryService");

async function createSettings(userId, settings){
    settings.user = { id: userId};
    settings.category = await getCategoryByName(settings.category);
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

   if(data.category)data.category = await getCategoryByName(data.category);

   return await settingsAccess.updateSettings(id, data);
 }
 
 module.exports = {
     createSettings,
     getSettingsByID,
     getSettingsByUserId,
     deleteSettings,
     updateSettings,
 };

