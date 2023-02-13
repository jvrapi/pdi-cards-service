-- AlterTable
ALTER TABLE `cards` MODIFY `layout` VARCHAR(191) NULL,
    MODIFY `type_line` VARCHAR(191) NULL,
    MODIFY `frame` VARCHAR(191) NULL,
    MODIFY `border_color` VARCHAR(191) NULL,
    MODIFY `rarity` VARCHAR(191) NULL,
    MODIFY `is_reserved` BOOLEAN NULL,
    MODIFY `is_reprint` BOOLEAN NULL,
    MODIFY `is_variant` BOOLEAN NULL,
    MODIFY `is_found_in_booster` BOOLEAN NULL,
    MODIFY `is_story_spotlight` BOOLEAN NULL;
