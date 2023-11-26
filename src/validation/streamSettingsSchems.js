const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        stream_title: Joi.string(),
        category: Joi.string().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        stream_title: Joi.string(),
        category: Joi.string()
    }).required().min(1)
}


module.exports = { 
    id,
    create,
    update
}