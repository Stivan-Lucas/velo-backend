import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive(),
  HOST: z.string().min(1),

  DATABASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas");

  for (const issue of parsed.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }

  process.exit(1);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  isProd: parsed.data.NODE_ENV === "production",

  port: parsed.data.PORT,
  host: parsed.data.HOST,

  databaseUrl: parsed.data.DATABASE_URL,
} as const;
