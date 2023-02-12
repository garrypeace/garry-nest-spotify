/*
  Warnings:

  - Added the required column `followers` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "followers" INTEGER NOT NULL,
ADD COLUMN     "popularity" INTEGER NOT NULL;
