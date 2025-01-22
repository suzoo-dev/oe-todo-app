-- AlterTable
ALTER TABLE `Task` MODIFY `done_flag` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `due_date` DATETIME(3) NULL,
    MODIFY `tags` VARCHAR(191) NULL,
    MODIFY `notes` VARCHAR(191) NULL,
    MODIFY `deleted_flag` BOOLEAN NOT NULL DEFAULT false;
