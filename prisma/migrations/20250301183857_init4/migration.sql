/*
  Warnings:

  - You are about to drop the column `overview` on the `episode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "episode" DROP COLUMN "overview";

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "genre" TEXT[];
