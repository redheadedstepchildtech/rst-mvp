-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isNonprofit" BOOLEAN NOT NULL DEFAULT false,
    "boostCredits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Need" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "needType" TEXT NOT NULL,
    "amount" TEXT,
    "category" TEXT,
    "why" TEXT,
    "story" TEXT,
    "photoFileName" TEXT,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "wantsBoost" BOOLEAN NOT NULL DEFAULT false,
    "aiListing" TEXT,
    "appraisal" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Need_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boost" (
    "id" TEXT NOT NULL,
    "needId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boost" ADD CONSTRAINT "Boost_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
