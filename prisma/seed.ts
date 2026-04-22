import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await prisma.user.upsert({
    where: { email: "admin@rst.local" },
    update: {},
    create: {
      email: "admin@rst.local",
      password: hashed,
      role: "admin",
    },
  });
}

main();
