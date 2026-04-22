/*
  Warnings:

  - You are about to drop the column `category` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `dignityBoost` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `ein` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `needType` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `nonprofitName` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `story` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `urgencyBoost` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `visibilityBoost` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `boostCredits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isNonprofit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Boost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportedPhoto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Need` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boost" DROP CONSTRAINT "Boost_needId_fkey";

-- DropForeignKey
ALTER TABLE "Need" DROP CONSTRAINT "Need_userId_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Need" DROP COLUMN "category",
DROP COLUMN "dignityBoost",
DROP COLUMN "ein",
DROP COLUMN "needType",
DROP COLUMN "nonprofitName",
DROP COLUMN "photos",
DROP COLUMN "story",
DROP COLUMN "updatedAt",
DROP COLUMN "urgencyBoost",
DROP COLUMN "userId",
DROP COLUMN "verified",
DROP COLUMN "visibilityBoost",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isFulfilled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "boostCredits",
DROP COLUMN "isAdmin",
DROP COLUMN "isNonprofit",
DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Boost";

-- DropTable
DROP TABLE "ReportedPhoto";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "tagline" TEXT,
    "story" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwapMeetItem" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SwapMeetItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwapMeetItem" ADD CONSTRAINT "SwapMeetItem_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
