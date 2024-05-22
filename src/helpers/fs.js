const fs = require('fs');
const DIR = "Images/", DIR2 = "server/thumbnails/", DIR3 = "server/media/live/";

const deleteFile = (imageName)=>{
    if(!fs.existsSync(DIR + imageName))return;
    fs.unlink(DIR + imageName, (err) => {
        if (err) {
            throw err;
        }
    });
}

const deleteF = (dir, file)=>{
    if(!fs.existsSync(dir + file))return;
    fs.unlink(dir + file, (err) => {
        if (err) {
            throw err;
        }
    });
}

const deleteMedia = (thumbnailName, videoName)=>{
    deleteF(DIR2, thumbnailName);
    deleteF(DIR3, videoName);
}

const createImages = ()=>{
    if(fs.existsSync(DIR))return;
    fs.mkdir(DIR, (err) => {
        if (err) {
            throw err;
        }
    });
}

const copyImage = (oldFile, copyFile)=>{

fs.copyFile(DIR2+oldFile, DIR2+copyFile, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('Файл успешно копирован')
});
}

async function renameDir(oldName, newName) {
    try{
        await fs.rename(DIR3+oldName, DIR3+newName,() => {
            console.log("\nDir Renamed!\n");
        });
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    deleteFile,
    createImages,
    copyImage,
    renameDir,
    deleteMedia
}
