/*
  Warnings:

  - Changed the type of `datetime` on the `Progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "datetime",
ADD COLUMN     "datetime" INTEGER NOT NULL;
