const joi = require('joi').extend(require('@hapi/joi-date'))

module.exports = () => ({
    post: joi.object().keys({
        email: joi.string().email().required(),
        birthDate: joi.date().format('YYYY-MM-DD').raw()
    }).options({allowUnknown: true}),

    put: joi.object().keys({
        email: joi.string().email().required(),
        birthDate: joi.date().format('YYYY-MM-DD').raw()
    }).options({allowUnknown: true}),

    patch: joi.object().keys({
        email: joi.string().email(),
        birthDate: joi.date().format('YYYY-MM-DD').raw()
    }).options({allowUnknown: true}),

    headers: joi.object().keys({
        'content-type': joi.string().valid('application/json').required()
    }).options({allowUnknown: true, stripUnknown: true})
})