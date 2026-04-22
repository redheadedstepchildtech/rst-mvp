import { prisma } from "../lib/prisma";

async function run() {
  const donations = await prisma.donation.findMany();
  const helpOffers = await prisma.helpOffer.findMany();

  for (const d of donations) {
    await prisma.need.create({
      data: {
        type: "donation",
        title: d.title,
        category: d.category,
        description: d.description,
        userId: d.userId,
      },
    });
  }

  for (const h of helpOffers) {
    await prisma.need.create({
      data: {
        type: "help-offer",
        title: h.title,
        description: h.description,
        userId: h.userId,
      },
    });
  }

  console.log("Migration complete");
}

run();