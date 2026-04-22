-- CreateTable
CREATE TABLE "PartnerRules" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "categories" TEXT,
    "cities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartnerRules" ADD CONSTRAINT "PartnerRules_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
