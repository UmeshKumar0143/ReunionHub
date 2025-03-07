/*
  Warnings:

  - You are about to drop the column `email` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Alumni` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enroln]` on the table `Alumni` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enroln]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enroln` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enroln` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Alumni_email_key";

-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "skills",
ADD COLUMN     "enroln" INTEGER NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "enroln" INTEGER NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_enroln_key" ON "Alumni"("enroln");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enroln_key" ON "Student"("enroln");
