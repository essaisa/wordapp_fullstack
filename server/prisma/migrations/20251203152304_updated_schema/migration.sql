/*
  Warnings:

  - You are about to drop the column `dateString` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `History` table. All the data in the column will be lost.
  - Added the required column `historyRec` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "dateString",
DROP COLUMN "day",
ADD COLUMN     "historyRec" JSONB NOT NULL;
