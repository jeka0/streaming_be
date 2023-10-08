const { Joi, Segments } = require('celebrate');

const login = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().required(),
        password: Joi.string().required()
    })
}

const refresh = {
    [Segments.BODY]: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const register = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().required(),
        password: Joi.string().required(),
    })
}

module.exports = {login, register, refresh}