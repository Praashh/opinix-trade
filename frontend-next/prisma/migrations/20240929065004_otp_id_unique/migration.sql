/*
  Warnings:

  - A unique constraint covering the columns `[otpID]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTP_otpID_key" ON "OTP"("otpID");
