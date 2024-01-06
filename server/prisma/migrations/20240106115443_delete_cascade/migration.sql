-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_listId_fkey`;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
