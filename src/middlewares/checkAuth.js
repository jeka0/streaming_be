const jwt = require('../helpers/jwt.js');
const userService = require('../services/userService.js')
require('dotenv').config();

const accessTokenSecret = process.env.JWT_ACCESS_KEY;

const checkAuth = (req, res, next) => {
    try {
        const accesstoken = req.headers.authorization.replace(/Bearer\s?/, '');;
        const decoded = jwt.verifyToken(accesstoken, accessTokenSecret);
        req.userId = decoded.id;

        next();
    } catch (err) {
        res.status(401).send("AccessToken is not valid");
    }
}

const checkSocketAuth = (socket, next) => {
    try {
        const accesstoken = socket.handshake.auth.token.replace(/Bearer\s?/, '');
        const decoded = jwt.verifyToken(accesstoken, accessTokenSecret);
        socket.userId = decoded.id;

        next();
    } catch (err) {
        console.log("AccessToken is not valid");
        res.status(401).send(new Error("AccessToken is not valid"));
    }
}

const checkAdminRole = async (req, res, next) => {
    const userId = req.userId;
    try{
        const user = await userService.getUserByID(userId);
        if(user.role.name === "Admin"){
            next();
        }else{
            throw new Error("Access denied");
        }
    }catch(err){
        console.log(`Access denied for user: ${userId}`);
        res.status(400).send(err.message);
    }
}

module.exports = {
    checkAuth,
    checkSocketAuth,
    checkAdminRole,
};