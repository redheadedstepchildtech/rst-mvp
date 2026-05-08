import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  dotenv: true, // REQUIRED for Prisma CLI to load .env
  datasources: {
    db: {
      provider: "postgresql",
      url: { fromEnv: "DATABASE_URL" }, // REQUIRED for Prisma 5/7
    },
  },
});