import Fastify from "fastify";
import { logger } from "./config/logger.js";

export const app = Fastify({ logger });

app.get("/", async () => {
  return { hello: "world" };
});
