const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const name = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}

module.exports = { 
    id,
    name
}