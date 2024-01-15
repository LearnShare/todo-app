/*
  Warnings:

  - Added the required column `hash` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NULL,
    ADD COLUMN `user` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `ref` INTEGER NULL,
    `ctime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `etime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
