/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Need" ADD COLUMN     "boostCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "boostType" TEXT,
ADD COLUMN     "lastBoostedAt" TIMESTAMP(3),
ADD COLUMN     "partnerId" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "orgName" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'helper',
ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
