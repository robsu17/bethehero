import "dotenv";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ A invalide environment variables!", _env.error.format());

  throw new Error("invalid environment variables.");
}

export const env = _env.data;
