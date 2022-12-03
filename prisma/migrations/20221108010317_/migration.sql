/*
  Warnings:

  - You are about to drop the `consumo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `consumo`;

-- CreateTable
CREATE TABLE `tableConsumo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gastos` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `consumo` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `mes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
