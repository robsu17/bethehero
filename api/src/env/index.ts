import { config } from "dotenv";

import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ A invalide environment variables!", _env.error.format());

  throw new Error("invalid environment variables.");
}

export const env = _env.data;
