const fs = require('fs');
const DIR = "Images/";

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

module.exports = {
    deleteFile,
    createImages
}
