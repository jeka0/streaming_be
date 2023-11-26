const fs = require('fs');
const DIR = "Images/", DIR2 = "server/thumbnails/";

const deleteFile = (imageName)=>{
    if(!fs.existsSync(DIR + imageName))return;
    fs.unlink(DIR + imageName, (err) => {
        if (err) {
            throw err;
        }
    });
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

module.exports = {
    deleteFile,
    createImages,
    copyImage
}
