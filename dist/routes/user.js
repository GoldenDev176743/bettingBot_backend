"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import projects
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../validation/user");
const user_3 = require("../swagger/user");
const sendmail_1 = __importDefault(require("../utils/sendmail"));
const options = { abortEarly: false, stripUnknown: true };
exports.userRoute = [
    {
        method: "POST",
        path: "/register",
        options: {
            description: "Register User",
            plugins: user_3.userRegisterSwagger,
            tags: ["api", "user"],
            validate: {
                payload: user_2.createUserSchema,
                options,
                failAction: (request, h, error) => {
                    const details = error.details.map((d) => {
                        return {
                            message: d.message,
                            path: d.path,
                        };
                    });
                    return h.response(details).code(400).takeover();
                },
            },
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // check already existing users
                const email = request.payload["email"];
                const user = yield user_1.default.findOne({ email });
                if (user) {
                    return response
                        .response([{ message: "User already exists.", code: 409 }])
                        .code(409);
                }
                // get account data from request data
                const UserData = {
                    firstname: request.payload["firstname"],
                    lastname: request.payload["lastname"],
                    email: request.payload["email"],
                    password: request.payload["password"],
                    emailVerifyStatus: "unverified",
                    license: request.payload["license"],
                };
                const newUser = new user_1.default(UserData);
                // save account in db after hashing password
                const { password } = newUser;
                const hash = yield bcrypt_1.default.hash(password, 10);
                newUser.password = hash;
                const Result = yield newUser.save();
                // email verification
                const token = jsonwebtoken_1.default.sign({ userId: Result._id, email: Result.email }, config_1.default.jwtSecret, {
                    expiresIn: "3m",
                });
                const baseUrl = `${request.server.info.protocol}://${request.info.host}`;
                const content = `<div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;"><h1 style="font-size: 36px; color: #333; margin-bottom: 20px;">Hello</h1><p style="font-size: 18px; color: #666; margin-bottom: 20px;">Welcome!</p><p style="font-size: 18px; color: #666; margin-bottom: 40px;">This is your email verification link. Please click the button below to verify your email:</p><a href="${baseUrl}/api/v1/user/verify-email/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 10px; font-size: 18px;">Verify Email</a></div>`;
                (0, sendmail_1.default)(Result.email, content);
                return response.response([{ Result, code: 201 }]).code(201);
            }
            catch (error) {
                return response.response(error).code(500);
            }
        }),
    },
    {
        method: "POST",
        path: "/login",
        options: {
            description: "Login User",
            plugins: user_3.userLoginSwagger,
            tags: ["api", "user"],
            validate: {
                payload: user_2.userLoginSchema,
                options,
                failAction: (request, h, error) => {
                    const details = error.details.map((d) => {
                        return {
                            message: d.message,
                            path: d.path,
                        };
                    });
                    return h.response(details).code(400).takeover();
                },
            },
        },
        handler: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ email: request.payload["email"] });
            if (user) {
                const hpass = yield bcrypt_1.default.compare(request.payload["password"], user.password);
                try {
                    if (hpass) {
                        if (user.emailVerifyStatus === "verified") {
                            const token = jsonwebtoken_1.default.sign({
                                userId: user._id,
                                email: user.email,
                            }, config_1.default.jwtSecret, {
                                expiresIn: "1h",
                            });
                            const info = {
                                email: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                license: user.license,
                                emailVerifyStatus: user.emailVerifyStatus,
                            };
                            return response
                                .response([
                                {
                                    token,
                                    info: info,
                                    code: 200,
                                },
                            ])
                                .code(200);
                        }
                        else {
                            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, config_1.default.jwtSecret, {
                                expiresIn: "3m",
                            });
                            const baseUrl = `${request.server.info.protocol}://${request.info.host}`;
                            const content = `<div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;"><h1 style="font-size: 36px; color: #333; margin-bottom: 20px;">Hello</h1><p style="font-size: 18px; color: #666; margin-bottom: 20px;">Welcome!</p><p style="font-size: 18px; color: #666; margin-bottom: 40px;">This is your email verification link. Please click the button below to verify your email:</p><a href="${baseUrl}/api/v1/user/verify-email/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 10px; font-size: 18px;">Verify Email</a></div>`;
                            (0, sendmail_1.default)(user.email, content);
                            return response
                                .response([
                                {
                                    message: "Email verification has sent to your email",
                                    code: 403,
                                },
                            ])
                                .code(403);
                        }
                    }
                    else {
                        return response
                            .response([
                            {
                                message: "Password is incorrect",
                                path: ["password"],
                                code: 401,
                            },
                        ])
                            .code(401);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            return response
                .response([{ message: "User not found", path: ["email"], code: 404 }])
                .code(404);
        }),
    },
];
//# sourceMappingURL=user.js.map