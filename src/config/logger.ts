import type { LoggerOptions } from "pino";
import { env } from "./env.js";

export const logger: LoggerOptions = env.isProd
  ? {
      level: "info",
    }
  : {
      level: "debug",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          timezone: "America/Sao_Paulo",
          ignore: "pid,hostname",
        },
      },
    };
