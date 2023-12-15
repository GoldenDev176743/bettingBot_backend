"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().required().messages({
        "any.required": "Please input firstname."
    }),
    lastname: joi_1.default.string().required().messages({
        "any.required": "Please input lastname."
    }),
    email: joi_1.default.string().email().required().messages({
        "any.required": "Please input email.",
        "string.email": "Please must be a valid email.",
    }),
    password: joi_1.default.string().required().min(6).messages({
        "any.required": "Please input password.",
        "string.min": "Password must be at least 6 characters.",
    }),
    license: joi_1.default.object({
        tennis: joi_1.default.object({
            key: joi_1.default.string().allow('').optional(),
            expiration: joi_1.default.date().allow('').optional(),
        }),
        football: joi_1.default.object({
            key: joi_1.default.string().optional(),
            expiration: joi_1.default.date().optional(),
        }),
        volleyball: joi_1.default.object({
            key: joi_1.default.string().optional(),
            expiration: joi_1.default.date().optional(),
        }),
        basketball: joi_1.default.object({
            key: joi_1.default.string().optional(),
            expiration: joi_1.default.date().optional(),
        })
    }),
});
//# sourceMappingURL=register.js.map