-- AlterTable
ALTER TABLE `cards` ADD COLUMN `face_of_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_face_of_id_fkey` FOREIGN KEY (`face_of_id`) REFERENCES `cards`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
