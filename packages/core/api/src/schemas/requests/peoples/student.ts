import { Joi } from 'celebrate';

export const StudentCreateRequestBodySchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    
    displayName: Joi.string().optional(),
    useGravatar: Joi.boolean().optional(),
    avatar: Joi.string().optional(),
});
