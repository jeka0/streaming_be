const shortid = require('shortid');

const generateStreamKey = ()=>{
    return shortid.generate();
}

module.exports = {
    generateStreamKey
}