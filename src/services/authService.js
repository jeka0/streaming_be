const jwt = require("../helpers/jwt");
const userService = require("./userService");
const { compare } = require("../helpers/encrypt"); 

const accessTokenSecret = process.env.JWT_ACCESS_KEY;
const refreshTokenSecret = process.env.JWT_REFRESH_KEY;
const accessTokenLifetime = process.env.ACCESS_TOKEN_LIFETIME;
const refreshTokenLifetime = process.env.REFRESH_TOKEN_LIFETIME;

async function login(data){
    const user = await userService.getUserByLogin(data.login);

    if(!user || !await compare(data.password, user.password)){   
        throw new Error("Invalid login or password");
    }

    const accessToken = jwt.createToken({ id: user.id }, accessTokenSecret, accessTokenLifetime);
    const refreshToken = jwt.createToken({ id: user.id }, refreshTokenSecret, refreshTokenLifetime);

    return { accessToken, refreshToken };
}

async function register(data){
    const user = await userService.getUserByLogin(data.login);
    if(user){
        throw new Error("This login is already in use by another account");
    }
    
    await userService.createUser(data);
}

async function refresh(data)
{
    try{
        const result =  jwt.verifyToken(data.refreshToken, refreshTokenSecret);

        if(!result){
            throw new Error("RefreshToken is not valid");
        }
        
        const accessToken = jwt.createToken({ id: result.id }, accessTokenSecret, accessTokenLifetime);
        const refreshToken = jwt.createToken({ id: result.id }, refreshTokenSecret, refreshTokenLifetime);

        return { accessToken, refreshToken };
    }catch{ throw new Error("RefreshToken is not valid"); }
}

module.exports={
    login,
    register,
    refresh
}