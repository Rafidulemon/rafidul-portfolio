-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `image1` VARCHAR(191) NOT NULL,
    `image2` VARCHAR(191) NOT NULL,
    `image3` VARCHAR(191) NOT NULL,
    `image4` VARCHAR(191) NOT NULL,
    `image5` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `self_introduction` VARCHAR(191) NOT NULL,
    `skill_description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMedia` (
    `user_id` VARCHAR(191) NOT NULL,
    `facebook` VARCHAR(191) NOT NULL,
    `youtube` VARCHAR(191) NOT NULL,
    `twitter` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `dribbble` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SocialMedia_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationalDetail` (
    `edu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `group_major` VARCHAR(191) NOT NULL,
    `institution_name` VARCHAR(191) NOT NULL,
    `passing_year` INTEGER NOT NULL,

    PRIMARY KEY (`edu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfessionalDetail` (
    `prof_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `company_website` VARCHAR(191) NOT NULL,
    `work_from` DATETIME(3) NOT NULL,
    `work_till` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prof_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `skill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `skill_name` VARCHAR(191) NOT NULL,
    `skill_percentage` INTEGER NOT NULL,

    PRIMARY KEY (`skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `project_description` VARCHAR(191) NOT NULL,
    `project_image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `blog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `blog_name` VARCHAR(191) NOT NULL,
    `blog_details` VARCHAR(191) NOT NULL,
    `blog_image` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`blog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `service_name` VARCHAR(191) NOT NULL,
    `service_details` VARCHAR(191) NOT NULL,
    `service_image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SocialMedia` ADD CONSTRAINT `SocialMedia_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationalDetail` ADD CONSTRAINT `EducationalDetail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalDetail` ADD CONSTRAINT `ProfessionalDetail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
