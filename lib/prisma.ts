import { PrismaClient } from "@prisma/client";
import { PrismaPostgres } from "@prisma/adapter-postgresql";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

// Create a PG pool
const pool = new Pool({
  connectionString,
});

// Create the Prisma adapter
const adapter = new PrismaPostgres(pool);

// Create the Prisma client with the adapter
export const prisma = new PrismaClient({
  adapter,
});