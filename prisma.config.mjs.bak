import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  dotenv: true,
  datasources: {
    db: {
      provider: "postgresql",
      url: { fromEnv: "DATABASE_URL" },
    },
  },
});