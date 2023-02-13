/*
  Warnings:

  - You are about to drop the column `is_full_art` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `is_textless` on the `cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cards` DROP COLUMN `is_full_art`,
    DROP COLUMN `is_textless`;
