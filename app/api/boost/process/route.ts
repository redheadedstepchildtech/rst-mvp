const helpers = await prisma.helper.findMany();

await prisma.need.update({
  where: { id: needId },
  data: {
    smsSent: {
      increment: helpers.length,
    },
  },
});