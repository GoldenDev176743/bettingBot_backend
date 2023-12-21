"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    mongoURI: process.env.DATABASE,
    jwtSecret: process.env.JWTSECRET,
    apiVersion: process.env.APIVERSION,
    sendmailAddress: process.env.AUTHEMAILADDRESS,
    sendmailPassword: process.env.AUTHMAILPASSWORD,
    frommailAddress: process.env.FROMMAILADDRESS
};
//# sourceMappingURL=index.js.map