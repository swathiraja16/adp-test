const Joi = require('joi');

const taskPayload = Joi.object({
    id: Joi.string().required(),
    result: Joi.number().unsafe().required()
});

module.exports.taskPayload = taskPayload;