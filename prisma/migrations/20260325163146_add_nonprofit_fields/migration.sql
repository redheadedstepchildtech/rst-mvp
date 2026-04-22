-- AlterTable
ALTER TABLE "Need" ADD COLUMN     "ein" TEXT,
ADD COLUMN     "nonprofitName" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
