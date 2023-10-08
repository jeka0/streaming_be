const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./Images");
    },
    filename: (req, file, cb)=>{
        req.body.image = Date.now() + path.extname(file.originalname);
        cb(null, req.body.image);
    }
});

const upload = multer({ storage });

module.exports = {
    upload
};
