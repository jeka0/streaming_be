const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const name = {
    [Segments.PARAMS]: Joi.object().keys({
        name: Joi.string().required()
    })
}

const bodyName ={
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        stream_title: Joi.string(),
        categoryName: Joi.string().required()
    }).required().min(1)
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        stream_title: Joi.string(),
        categoryName: Joi.string()
    }).required().min(1)
}

const byKey = {
    [Segments.BODY]: Joi.object().keys({
        streamKey: Joi.string().required()
    })
}

const pagination = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required(),
        order: Joi.string().default("DESC"),
        category: Joi.string()
    })
}

module.exports = { 
    id,
    name,
    update,
    create,
    pagination,
    byKey,
    bodyName
}