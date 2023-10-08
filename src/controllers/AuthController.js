const authService = require("../services/authService")

async function login(req, res){
    const { login, password } = req.body;

    authService.login({ login, password })
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function register(req, res){
    const { login, password } = req.body;

    authService.register({ login, password })
    .then(()=>res.send({message: "OK"}))
    .catch((err)=>res.status(400).send(err.message));
}

async function refresh(req, res){
    const { refreshToken } = req.body;

    authService.refresh({ refreshToken })
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}


module.exports = {
    login,
    refresh,
    register
};