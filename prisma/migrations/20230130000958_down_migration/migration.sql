/*
  Warnings:

  - Made the column `layout` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type_line` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frame` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `border_color` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_reserved` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_reprint` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_variant` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_found_in_booster` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_story_spotlight` on table `cards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cards` MODIFY `layout` VARCHAR(191) NOT NULL,
    MODIFY `type_line` VARCHAR(191) NOT NULL,
    MODIFY `frame` VARCHAR(191) NOT NULL,
    MODIFY `border_color` VARCHAR(191) NOT NULL,
    MODIFY `rarity` VARCHAR(191) NOT NULL,
    MODIFY `is_reserved` BOOLEAN NOT NULL,
    MODIFY `is_reprint` BOOLEAN NOT NULL,
    MODIFY `is_variant` BOOLEAN NOT NULL,
    MODIFY `is_found_in_booster` BOOLEAN NOT NULL,
    MODIFY `is_story_spotlight` BOOLEAN NOT NULL;
