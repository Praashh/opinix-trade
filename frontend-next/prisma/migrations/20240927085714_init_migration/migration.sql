-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ONGOING', 'ENDED');

-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentBalances" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderBook" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "topPriceYes" DOUBLE PRECISION NOT NULL,
    "topPriceNo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YesOrder" (
    "id" TEXT NOT NULL,
    "orderBookId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoOrder" (
    "id" TEXT NOT NULL,
    "orderBookId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "side" "TradeSide" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PayoutStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderBook_eventId_key" ON "OrderBook"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventParticipants_AB_unique" ON "_EventParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_EventParticipants_B_index" ON "_EventParticipants"("B");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBook" ADD CONSTRAINT "OrderBook_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YesOrder" ADD CONSTRAINT "YesOrder_orderBookId_fkey" FOREIGN KEY ("orderBookId") REFERENCES "OrderBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoOrder" ADD CONSTRAINT "NoOrder_orderBookId_fkey" FOREIGN KEY ("orderBookId") REFERENCES "OrderBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventParticipants" ADD CONSTRAINT "_EventParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventParticipants" ADD CONSTRAINT "_EventParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
