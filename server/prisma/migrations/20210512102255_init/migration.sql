/*
  Warnings:

  - Added the required column `eventOrganizerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `eventOrganizerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD FOREIGN KEY (`eventOrganizerId`) REFERENCES `EventOrganizer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
