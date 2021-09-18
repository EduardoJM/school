import { Joi } from 'celebrate';

export const AuthRequestBodySchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
