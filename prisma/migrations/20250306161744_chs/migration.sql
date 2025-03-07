/*
  Warnings:

  - You are about to drop the column `connections` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "connections",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "skills";
