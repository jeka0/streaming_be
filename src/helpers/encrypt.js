const bcrypt = require('bcrypt')

const getHesh = async (data)=>{
    return await bcrypt.hash(data, 10);
}

const compare = async (data, hashData)=>{
   return await bcrypt.compare(data, hashData);
}

module.exports = {
    getHesh,
    compare
}