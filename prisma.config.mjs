import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasources: {
    db: {
      provider: "postgresql",
      url: { fromEnv: "DATABASE_URL" },
    },
  },
});