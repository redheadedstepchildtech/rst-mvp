/*
  Warnings:

  - You are about to drop the column `boostCount` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `lastBoostedAt` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `partnerId` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Need` table. All the data in the column will be lost.
  - Made the column `category` on table `Need` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Need` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Need" DROP CONSTRAINT "Need_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "Need" DROP CONSTRAINT "Need_userId_fkey";

-- AlterTable
ALTER TABLE "BoostHistory" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Need" DROP COLUMN "boostCount",
DROP COLUMN "lastBoostedAt",
DROP COLUMN "partnerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "microPlacement" TEXT,
ADD COLUMN     "microSize" TEXT,
ADD COLUMN     "microSummary" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "qrUrl" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'open',
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "zip" TEXT,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "zip" TEXT;

-- CreateTable
CREATE TABLE "ReportedPhoto" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "userId" TEXT,
    "photoUrl" TEXT,
    "reason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportedPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertSubscriber" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "userId" TEXT,
    "amount" DOUBLE PRECISION,
    "donorName" TEXT,
    "donorEmail" TEXT,
    "message" TEXT,
    "story" TEXT,
    "template" TEXT,
    "photoUrl" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpOffer" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,
    "type" TEXT,
    "description" TEXT,
    "availability" TEXT,
    "contactPreference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "helpOfferId" TEXT,
    "donationId" TEXT,
    "needId" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PartnerNeeds" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PartnerNeeds_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PartnerNeeds_B_index" ON "_PartnerNeeds"("B");

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportedPhoto" ADD CONSTRAINT "ReportedPhoto_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportedPhoto" ADD CONSTRAINT "ReportedPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_helpOfferId_fkey" FOREIGN KEY ("helpOfferId") REFERENCES "HelpOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerNeeds" ADD CONSTRAINT "_PartnerNeeds_A_fkey" FOREIGN KEY ("A") REFERENCES "Need"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerNeeds" ADD CONSTRAINT "_PartnerNeeds_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
