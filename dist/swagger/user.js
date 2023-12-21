"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSwagger = exports.userLoginSwagger = exports.userRegisterSwagger = void 0;
exports.userRegisterSwagger = {
    "hapi-swagger": {
        responses: {
            201: {
                description: "User created successfully.",
            },
            400: {
                description: "Input Fields Required.",
            },
            409: {
                description: "User already exists.",
            },
        },
    },
};
exports.userLoginSwagger = {
    "hapi-swagger": {
        responses: {
            200: {
                description: "User logined successfully.",
            },
            401: {
                description: "Password is incorrect.",
            },
            404: {
                description: "User not found.",
            },
        },
    },
};
exports.verifyEmailSwagger = {
    "hapi-swagger": {
        responses: {
            201: {
                description: "Email is verified",
            },
            400: {
                description: "Email is not verified",
            },
        },
    },
};
//# sourceMappingURL=user.js.map