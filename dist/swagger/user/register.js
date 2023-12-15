"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSwagger = void 0;
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
//# sourceMappingURL=register.js.map