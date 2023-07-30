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

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 HTTP Server running on port ${port}`);
});
