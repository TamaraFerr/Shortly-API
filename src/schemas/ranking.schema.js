import Joi from "joi";

export const cadastroSchema = joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().required(),
    password: Joi.string().min(3).required()
})

export const loginSchema = joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required()
})