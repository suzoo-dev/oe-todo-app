-- CreateTable
CREATE TABLE `Task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(191) NOT NULL,
    `done_flag` BOOLEAN NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `owner_id` INTEGER NOT NULL,
    `task_created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_flag` BOOLEAN NOT NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `city_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weather` (
    `weather_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_id` INTEGER NOT NULL,
    `weather_detail` VARCHAR(191) NOT NULL,
    `weather_temperature` INTEGER NOT NULL,

    PRIMARY KEY (`weather_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weather` ADD CONSTRAINT `Weather_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
