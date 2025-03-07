/*
  Warnings:

  - Added the required column `name` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alumni" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "name" TEXT NOT NULL;
