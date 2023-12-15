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
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("../models/user"));
const registerSocketServer = (server) => __awaiter(void 0, void 0, void 0, function* () {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`user connected ${socket.id}`);
        socket.on("login", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("loggined", data);
            const user = yield user_1.default.findOne({ email: data });
            if (user) {
                // if (user.role === "admin") {
                //   socket["role"] = 0;
                //   console.log("admin has joined in help room");
                // } else {
                //   socket["role"] = 1;
                //   console.log(data + "logged in help room");
                // }
                socket["email"] = user.email;
                socket.join(user.email);
            }
        }));
        socket.on("newMessage", (data) => {
            console.log(data);
            // if (data["to"] !== "admin")
            //   io.to(data["to"]).emit("messageFromServer", data);
            // else io.to(data["from"]).emit("messageFromServer", data);
            io.to(data["from"]).emit("messageFromServer", data);
            io.to(data["to"]).emit("messageFromServer", data);
        });
        socket.on("disconnect", () => {
            console.log(socket["email"] + " disconnected");
        });
    });
});
exports.default = registerSocketServer;
//# sourceMappingURL=socketServer.js.map