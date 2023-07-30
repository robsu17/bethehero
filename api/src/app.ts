import fastify from "fastify";
import { userOngRoutes } from "./routes/route";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cors, {
  origin: true,
  credentials: true, // Habilita o envio de cookies
});

app.register(cookie);
app.register(userOngRoutes);
