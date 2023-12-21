"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerifyStatus: {
        type: String,
        required: true,
    },
    license: {
        tennis: {
            key: {
                type: String,
                required: false,
            },
            expiration: {
                type: Date,
                required: false,
            },
        },
        football: {
            key: {
                type: String,
                required: false,
            },
            expiration: {
                type: Date,
                required: false,
            },
        },
        volleyball: {
            key: {
                type: String,
                required: false,
            },
            expiration: {
                type: Date,
                required: false,
            },
        },
        basketball: {
            key: {
                type: String,
                required: false,
            },
            expiration: {
                type: Date,
                required: false,
            },
        },
    },
});
const User = mongoose_1.default.model("user", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map