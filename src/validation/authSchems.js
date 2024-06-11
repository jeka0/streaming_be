const { Joi, Segments } = require('celebrate');

const login = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().trim().lowercase().required().max(15),
        password: Joi.string().trim().required().min(5)
    })
}

const refresh = {
    [Segments.BODY]: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const register = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().trim().lowercase().required().max(15),
        password: Joi.string().trim().required().min(5),
    })
}

module.exports = {login, register, refresh}