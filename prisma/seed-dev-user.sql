INSERT INTO "User" (id, phone, "isNonprofit", "boostCredits", "createdAt")
VALUES ('dev-user', '4063247990', false, 5, NOW())
ON CONFLICT (id) DO NOTHING;
DATABASE_URL="postgresql://neondb_owner:password@ep-wandering-sun-aekont8p-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"