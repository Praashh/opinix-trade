/*
  Warnings:

  - Added the required column `otpID` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "otpID" TEXT NOT NULL;
