import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const TagRequestBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    subject: Joi.number().required(),
    active: Joi.boolean().required(),
});

export const TagCreateBodyValidation = celebrate(
    { body: TagRequestBodySchema },
    { messages, abortEarly: true, convert: true },
);

export const TagPartialUpdateRequestBodySchema = Joi.object().keys({
    name: Joi.string().optional(),
    subject: Joi.number().optional(),
    active: Joi.boolean().optional(),
});

export const TagPartialUpdateCreateBodyValidation = celebrate(
    { body: TagPartialUpdateRequestBodySchema },
    { messages, abortEarly: true, convert: true },
);
