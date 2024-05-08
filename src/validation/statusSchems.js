const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const code = {
    [Segments.BODY]: Joi.object().keys({
        code: Joi.string().required()
    })
}

module.exports = { 
    id,
    code
}