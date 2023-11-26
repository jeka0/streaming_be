const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        message: Joi.string().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        message: Joi.string().required()
    })
}

const pagination = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

module.exports = { 
    id,
    update,
    pagination
}