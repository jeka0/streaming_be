const jwt = require("jsonwebtoken")

const createToken=(data, salt, lifetime)=>
{
    return jwt.sign({...data}, salt, { expiresIn: lifetime });
};

const verifyToken=(token, salt)=>
{
    return jwt.verify(token, salt);
};

module.exports = {
    createToken,
    verifyToken
}