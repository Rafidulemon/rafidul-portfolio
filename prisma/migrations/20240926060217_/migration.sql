/*
  Warnings:

  - The primary key for the `blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `educationaldetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `professionaldetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skill` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `blog` DROP PRIMARY KEY,
    MODIFY `blog_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`blog_id`);

-- AlterTable
ALTER TABLE `educationaldetail` DROP PRIMARY KEY,
    MODIFY `edu_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`edu_id`);

-- AlterTable
ALTER TABLE `language` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `professionaldetail` DROP PRIMARY KEY,
    MODIFY `prof_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`prof_id`);

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `project_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`project_id`);

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`service_id`);

-- AlterTable
ALTER TABLE `skill` DROP PRIMARY KEY,
    MODIFY `skill_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`skill_id`);
