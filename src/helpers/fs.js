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

module.exports = {
    deleteFile
}
