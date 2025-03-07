/*
  Warnings:

  - The primary key for the `Alumni` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_alumniId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_alumniId_fkey";

-- DropForeignKey
ALTER TABLE "Webinar" DROP CONSTRAINT "Webinar_alumniId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_alumniId_fkey";

-- AlterTable
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Alumni_id_seq";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ALTER COLUMN "alumniId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "JobPost" ALTER COLUMN "alumniId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- AlterTable
ALTER TABLE "Webinar" ALTER COLUMN "alumniId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "alumniId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Webinar" ADD CONSTRAINT "Webinar_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
