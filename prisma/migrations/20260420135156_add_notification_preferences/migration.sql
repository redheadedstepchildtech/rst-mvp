-- CreateTable
CREATE TABLE "NotificationPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notifyOnBoost" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnCreate" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnVerify" BOOLEAN NOT NULL DEFAULT true,
    "categoryFilter" TEXT,
    "cityFilter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_userId_key" ON "NotificationPreferences"("userId");

-- AddForeignKey
ALTER TABLE "NotificationPreferences" ADD CONSTRAINT "NotificationPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
