/*
  Warnings:

  - You are about to drop the column `dayCompleted` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `History` table. All the data in the column will be lost.
  - Added the required column `dateString` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "dayCompleted",
DROP COLUMN "timestamp",
ADD COLUMN     "dateString" TEXT NOT NULL,
ADD COLUMN     "day" INTEGER NOT NULL;
