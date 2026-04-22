/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "updatedAt",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HelpOffer" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL,
ALTER COLUMN "contactPreference" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "alt";
