import Joi from "joi";

export const createUserSchema = Joi.object({
    firstname: Joi.string().required().messages({
        "any.required": "Please input firstname."
    }),

    lastname: Joi.string().required().messages({
        "any.required": "Please input lastname."
    }),

    email: Joi.string().email().required().messages({
        "any.required": "Please input email.",
        "string.email": "Please must be a valid email.",
    }),
    
    company: Joi.string().optional(),
    
    password: Joi.string().required().min(6).messages({
        "any.required": "Please input password.",
        "string.min": "Password must be at least 6 characters.",
    }),
})