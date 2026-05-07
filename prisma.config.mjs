import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL
    }
  }
});