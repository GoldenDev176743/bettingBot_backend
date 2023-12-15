"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_generator_1 = __importDefault(require("otp-generator"));
const OTP_LENGTH = 4;
const OTP_CONFIG = {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
};
const GenerateOTP = () => {
    const otp = otp_generator_1.default.generate(OTP_LENGTH, OTP_CONFIG);
    return otp;
};
exports.default = GenerateOTP;
//# sourceMappingURL=otp.js.map