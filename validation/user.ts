import Joi from "joi";

export const createUserSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "any.required": "Please input firstName."
    }),

    lastName: Joi.string().required().messages({
        "any.required": "Please input lastName."
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "any.required": "Please input email.",
        "string.email": "Please must be a valid email.",
    }),

    password: Joi.string().required().min(6).messages({
        "any.required": "Please input password.",
        "string.min": "Password must be at least 6 characters.",
    }),

    license: Joi.object({
        tennis: Joi.object({
            key: Joi.string().allow(null).optional(),
            expiration: Joi.date().allow(null).optional(),
        }),
        football: Joi.object({
            key: Joi.string().allow(null).optional(),
            expiration: Joi.date().allow(null).optional(),
        }),
        volleyball: Joi.object({
            key: Joi.string().allow(null).optional(),
            expiration: Joi.date().allow(null).optional(),
        }),
        basketball: Joi.object({
            key: Joi.string().allow(null).optional(),
            expiration: Joi.date().allow(null).optional(),
        })
    }),
})

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Please input email",
      "string.email": "Please must be a valid email.",
    }),
    password: Joi.string().required().min(6).messages({
      "any.required": "Please input password.",
      "string.min": "Password must be at least 6 characters.",
    })
  });