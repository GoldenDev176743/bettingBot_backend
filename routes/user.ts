import { Request, ResponseToolkit } from "@hapi/hapi";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import fs from "fs";

// import projects
import config from "../config";
import User from "../models/user";
import { createUserSchema, userLoginSchema } from "../validation/user";
import {
  userRegisterSwagger,
  userLoginSwagger,
  verifyEmailSwagger,
} from "../swagger/user";
import sendMail from "../utils/sendmail";
import GenerateOTP from "../utils/otp";

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
      try {
        // check already existing users
        const email = request.payload["email"];
        const user = await User.findOne({ email });
        if (user) {
          return response
            .response([{ message: "User already exists.", code: 409 }])
            .code(409);
        }

        // get account data from request data
        const UserData = {
          firstName: request.payload["firstName"],
          lastName: request.payload["lastName"],
          email: request.payload["email"],
          password: request.payload["password"],
          emailVerifyStatus: "unverified",
          license: request.payload["license"],
        };
        const newUser: any = new User(UserData);

        // save account in db after hashing password
        const { password } = newUser;
        const hash = await bcrypt.hash(password, 10);
        newUser.password = hash;
        const Result = await newUser.save();

        // email verification
        const token = Jwt.sign(
          { userId: Result._id, email: Result.email },
          config.jwtSecret,
          {
            expiresIn: "3m",
          }
        );
        const baseUrl = `${request.server.info.protocol}://${request.info.host}`;
        const content = `<div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;"><h1 style="font-size: 36px; color: #333; margin-bottom: 20px;">Hello</h1><p style="font-size: 18px; color: #666; margin-bottom: 20px;">Welcome!</p><p style="font-size: 18px; color: #666; margin-bottom: 40px;">This is your email verification link. Please click the button below to verify your email:</p><a href="${baseUrl}/api/v1/user/verify-email/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 10px; font-size: 18px;">Verify Email</a></div>`;
        sendMail(Result.email, content);
        return response.response([{ Result, code: 201 }]).code(201);
      } catch (error) {
        return response.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/verify-email/{token}",
    options: {
      description: "Verify Email",
      plugins: verifyEmailSwagger,
      tags: ["api", "user"],
    },
    handler: async (request: Request, response: ResponseToolkit) => {
      const success = fs.readFileSync("./utils/emailVeriffSucess.txt");
      const failed = fs.readFileSync("./utils/emailVeriffFail.txt");
      const decoded: any = Jwt.decode(request.params.token);
      if (decoded === null) {
        return failed.toLocaleString();
      }
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return failed.toLocaleString();
      }
      const user = await User.findById(decoded.userId);
      if (user) {
        user.emailVerifyStatus = "verified";
        await user.save();
        return success.toLocaleString();
      }
      return failed.toLocaleString();
    },
  },
  {
    method: "POST",
    path: "/login",
    options: {
      description: "Login User",
      plugins: userLoginSwagger,
      tags: ["api", "user"],
      validate: {
        payload: userLoginSchema,
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
      const user = await User.findOne({ email: request.payload["email"] });
      if (user) {
        const hpass = await bcrypt.compare(
          request.payload["password"],
          user.password
        );
        try {
          if (hpass) {
            if (user.emailVerifyStatus === "verified") {
              const token = Jwt.sign(
                {
                  userId: user._id,
                  email: user.email,
                },
                config.jwtSecret,
                {
                  expiresIn: "1h",
                }
              );
              const info = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
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
            } else {
              const token = Jwt.sign(
                { userId: user._id, email: user.email },
                config.jwtSecret,
                {
                  expiresIn: "3m",
                }
              );
              const baseUrl = `${request.server.info.protocol}://${request.info.host}`;
              const content = `<div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;"><h1 style="font-size: 36px; color: #333; margin-bottom: 20px;">Hello</h1><p style="font-size: 18px; color: #666; margin-bottom: 20px;">Welcome!</p><p style="font-size: 18px; color: #666; margin-bottom: 40px;">This is your email verification link. Please click the button below to verify your email:</p><a href="${baseUrl}/api/v1/user/verify-email/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 10px; font-size: 18px;">Verify Email</a></div>`;
              sendMail(user.email, content);
              return response
                .response([
                  {
                    message: "Email verification has sent to your email",
                    code: 403,
                  },
                ])
                .code(403);
            }
          } else {
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
        } catch (error) {
          console.log(error);
        }
      }
      return response
        .response([{ message: "User not found", path: ["email"], code: 404 }])
        .code(404);
    },
  },
];
