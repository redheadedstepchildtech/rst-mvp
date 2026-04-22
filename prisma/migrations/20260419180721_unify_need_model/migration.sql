/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HelpOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- DropForeignKey
ALTER TABLE "HelpOffer" DROP CONSTRAINT "HelpOffer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_donationId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_helpOfferId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Donation";

-- DropTable
DROP TABLE "HelpOffer";

-- DropTable
DROP TABLE "Photo";

-- CreateTable
CREATE TABLE "Need" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "tags" TEXT,
    "needs" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "photoUrl" TEXT,
    "qrUrl" TEXT,
    "theme" TEXT,
    "microSummary" TEXT,
    "microPlacement" TEXT,
    "microSize" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Need_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
