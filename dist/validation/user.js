"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        "any.required": "Please input firstName."
    }),
    lastName: joi_1.default.string().required().messages({
        "any.required": "Please input lastName."
    }),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "any.required": "Please input email.",
        "string.email": "Please must be a valid email.",
    }),
    password: joi_1.default.string().required().min(6).messages({
        "any.required": "Please input password.",
        "string.min": "Password must be at least 6 characters.",
    }),
    license: joi_1.default.object({
        tennis: joi_1.default.object({
            key: joi_1.default.string().allow(null).optional(),
            expiration: joi_1.default.date().allow(null).optional(),
        }),
        football: joi_1.default.object({
            key: joi_1.default.string().allow(null).optional(),
            expiration: joi_1.default.date().allow(null).optional(),
        }),
        volleyball: joi_1.default.object({
            key: joi_1.default.string().allow(null).optional(),
            expiration: joi_1.default.date().allow(null).optional(),
        }),
        basketball: joi_1.default.object({
            key: joi_1.default.string().allow(null).optional(),
            expiration: joi_1.default.date().allow(null).optional(),
        })
    }),
});
exports.userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "Please input email",
        "string.email": "Please must be a valid email.",
    }),
    password: joi_1.default.string().required().min(6).messages({
        "any.required": "Please input password.",
        "string.min": "Password must be at least 6 characters.",
    })
});
//# sourceMappingURL=user.js.map