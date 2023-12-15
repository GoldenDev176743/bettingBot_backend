"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSwagger = exports.userRegisterSwagger = void 0;
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
//# sourceMappingURL=user.js.map