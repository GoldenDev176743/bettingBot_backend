import { Request, ResponseToolkit } from "@hapi/hapi";

// import Model
import User from "../models/user";

// import Validation Schema
import { createUserSchema } from "../validation/user/register";

// import Swagger
import { userRegisterSwagger } from "../swagger/user/register";

const options = { abortEarly: false, stripUnknown: true };

export const userRoute = [
    {
        method: "POST",
        path: "/register",
        options: {
        description: "Register User",
        plugins: userRegisterSwagger,
        tags: ["api", "user"],
        validate: {
            payload: createUserSchema,
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
        handler: async (request: Request, response: ResponseToolkit) => {
        }
    }
];