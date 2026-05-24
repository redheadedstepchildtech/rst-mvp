/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Need` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Need" ADD COLUMN     "contact" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Need_slug_key" ON "Need"("slug");
