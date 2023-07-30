"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = __importDefault(require("@fastify/cookie"));
const app_1 = require("./app");
const route_1 = require("./routes/route");
const cors_1 = __importDefault(require("@fastify/cors"));
app_1.app.register(cors_1.default, {
    origin: true,
    credentials: true, // Habilita o envio de cookies
});
app_1.app.register(cookie_1.default);
app_1.app.register(route_1.userOngRoutes);
app_1.app
    .listen({
    port: 3333,
})
    .then(() => {
    console.log("🚀 HTTP Server running");
});
