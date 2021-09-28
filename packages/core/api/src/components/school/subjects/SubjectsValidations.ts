import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const SubjectRequestBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required(),
    icon: Joi.string().required(),
});

export const SubjectCreateBodyValidation = celebrate(
    { body: SubjectRequestBodySchema },
    { messages, abortEarly: true, convert: true },
);

export const SubjectPartialUpdateRequestBodySchema = Joi.object().keys({
    name: Joi.string().optional(),
    active: Joi.boolean().optional(),
    icon: Joi.string().optional(),
});

export const SubjectPartialUpdateCreateBodyValidation = celebrate(
    { body: SubjectPartialUpdateRequestBodySchema },
    { messages, abortEarly: true, convert: true },
);
