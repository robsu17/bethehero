import cookie from "@fastify/cookie";
import { app } from "./app";
import { userOngRoutes } from "./routes/route";
import cors from "@fastify/cors";

app.register(cors, {
  origin: true,
  credentials: true, // Habilita o envio de cookies
});

app.register(cookie);
app.register(userOngRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP Server running");
  });
