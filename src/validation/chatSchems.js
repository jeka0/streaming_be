const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const moderation = {
    [Segments.BODY]: Joi.object().keys({
        moderId: Joi.number().required(),
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        type: Joi.string(),
        users: Joi.string()
    })
}

const getByName = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        type: Joi.string(),
        users: Joi.string()
    }).required().min(1),
}

module.exports = { id, create, getByName, update, moderation }