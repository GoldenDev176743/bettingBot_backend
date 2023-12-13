import { Server } from "@hapi/hapi";

// import projects
import config from "../config";
import { userRoute } from "./user";

const setRoutes = async (server: Server) => {
    server.realm.modifiers.route.prefix = `/api/${config.apiVersion}/user`;
    server.route(userRoute);
};

export default setRoutes;