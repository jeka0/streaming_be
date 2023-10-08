const jwt = require('../helpers/jwt.js');
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
        next(new Error("AccessToken is not valid"));
    }
}

module.exports = {
    checkAuth,
    checkSocketAuth,
};