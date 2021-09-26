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
