/*
  Warnings:

  - You are about to drop the `cards_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards_formats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards_versions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `formats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `versions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colors` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formats` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versions` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cards_colors` DROP FOREIGN KEY `cards_colors_card_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_colors` DROP FOREIGN KEY `cards_colors_color_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_formats` DROP FOREIGN KEY `cards_formats_card_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_formats` DROP FOREIGN KEY `cards_formats_format_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_images` DROP FOREIGN KEY `cards_images_card_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_versions` DROP FOREIGN KEY `cards_versions_card_id_fkey`;

-- DropForeignKey
ALTER TABLE `cards_versions` DROP FOREIGN KEY `cards_versions_version_id_fkey`;

-- AlterTable
ALTER TABLE `cards` ADD COLUMN `colors` JSON NOT NULL,
    ADD COLUMN `formats` JSON NOT NULL,
    ADD COLUMN `versions` JSON NOT NULL;

-- DropTable
DROP TABLE `cards_colors`;

-- DropTable
DROP TABLE `cards_formats`;

-- DropTable
DROP TABLE `cards_images`;

-- DropTable
DROP TABLE `cards_versions`;

-- DropTable
DROP TABLE `colors`;

-- DropTable
DROP TABLE `formats`;

-- DropTable
DROP TABLE `versions`;
