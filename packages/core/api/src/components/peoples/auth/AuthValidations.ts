import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const AuthRequestBodySchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    userTypes: Joi.array().items(Joi.string().valid('UNKNOWN', 'ADMIN', 'STUDENT', 'TEACHER')).optional(),
});

export const AuthRequestBodyValidation = celebrate(
    { body: AuthRequestBodySchema },
    { messages, abortEarly: true, convert: true },
);

