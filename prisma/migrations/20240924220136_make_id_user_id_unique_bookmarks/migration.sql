/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Bookmark_url_userId_key` ON `Bookmark`;

-- CreateIndex
CREATE UNIQUE INDEX `Bookmark_id_userId_key` ON `Bookmark`(`id`, `userId`);
