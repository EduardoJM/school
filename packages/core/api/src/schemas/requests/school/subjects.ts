import { Joi } from 'celebrate';

export const SubjectRequestBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().optional(),
    icon: Joi.string().optional(),
});
