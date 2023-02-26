/*
  Warnings:

  - You are about to drop the column `imageUri` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `iconUri` on the `sets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cards` DROP COLUMN `imageUri`,
    ADD COLUMN `image_uri` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sets` DROP COLUMN `iconUri`,
    ADD COLUMN `icon_uri` VARCHAR(191) NULL;
