-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_set_id_fkey`;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_set_id_fkey` FOREIGN KEY (`set_id`) REFERENCES `sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
