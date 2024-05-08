const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        userId: Joi.number().required(),
        type: Joi.string().required(),
        status: Joi.string().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        status: Joi.string().required()
    })
}

const query = {
    [Segments.QUERY]: Joi.object().keys({
        userId: Joi.number().required(),
        chatId: Joi.number().required()
    })
}

module.exports = { 
    id,
    create,
    update,
    query
}