/*
  Warnings:

  - You are about to drop the column `boostType` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `microPlacement` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `microSize` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `microSummary` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `needs` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `qrUrl` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Need` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Need" DROP CONSTRAINT "Need_userId_fkey";

-- AlterTable
ALTER TABLE "Need" DROP COLUMN "boostType",
DROP COLUMN "microPlacement",
DROP COLUMN "microSize",
DROP COLUMN "microSummary",
DROP COLUMN "needs",
DROP COLUMN "photoUrl",
DROP COLUMN "qrUrl",
DROP COLUMN "theme",
DROP COLUMN "type",
DROP COLUMN "zip",
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PartnerNote" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerUpload" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRScan" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "QRScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoostHistory" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "userId" TEXT,
    "boostedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoostHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartnerNote" ADD CONSTRAINT "PartnerNote_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerNote" ADD CONSTRAINT "PartnerNote_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerUpload" ADD CONSTRAINT "PartnerUpload_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerUpload" ADD CONSTRAINT "PartnerUpload_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRScan" ADD CONSTRAINT "QRScan_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostHistory" ADD CONSTRAINT "BoostHistory_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostHistory" ADD CONSTRAINT "BoostHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
