import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const StudentCreateRequestBodySchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    
    displayName: Joi.string().optional(),
    useGravatar: Joi.boolean().optional(),
    avatar: Joi.string().optional(),
});

export const StudentCreateBodyValidation = celebrate(
    { body: StudentCreateRequestBodySchema },
    { messages, abortEarly: false, convert: true },
);
