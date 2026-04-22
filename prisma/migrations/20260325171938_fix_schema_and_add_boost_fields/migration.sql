/*
  Warnings:

  - You are about to drop the column `aiListing` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `appraisal` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `photoFileName` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `wantsBoost` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `why` on the `Need` table. All the data in the column will be lost.
  - The `amount` column on the `Need` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `category` on table `Need` required. This step will fail if there are existing NULL values in that column.
  - Made the column `story` on table `Need` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Need" DROP COLUMN "aiListing",
DROP COLUMN "appraisal",
DROP COLUMN "createdAt",
DROP COLUMN "photoFileName",
DROP COLUMN "premium",
DROP COLUMN "wantsBoost",
DROP COLUMN "why",
ADD COLUMN     "dignityBoost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "urgencyBoost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibilityBoost" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "story" SET NOT NULL,
ALTER COLUMN "photos" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ReportedPhoto" (
    "id" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportedPhoto_pkey" PRIMARY KEY ("id")
);
