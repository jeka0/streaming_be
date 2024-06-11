const { Joi, Segments } = require('celebrate');

const userId = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const userLogin = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().trim().lowercase().max(15),
        password: Joi.string().trim().min(5),
        image: Joi.string(),
    }).required().min(1),
}

const getByName = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}

module.exports = { userId, update, getByName, userLogin }