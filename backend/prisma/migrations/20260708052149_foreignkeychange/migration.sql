/*
  Warnings:

  - You are about to drop the column `userId` on the `Blogs` table. All the data in the column will be lost.
  - Added the required column `username` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_userId_fkey";

-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
