/*
  Warnings:

  - You are about to alter the column `datetime` on the `Progress` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Progress" ALTER COLUMN "datetime" SET DATA TYPE INTEGER;
