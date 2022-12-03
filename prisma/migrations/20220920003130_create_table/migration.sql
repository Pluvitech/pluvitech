-- CreateTable
CREATE TABLE `usuario` (
    `nome_usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `resposta` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `idpergunta` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pergunta` (
    `id` INTEGER NOT NULL,
    `pergunta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dados` (
    `id_dados` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` DECIMAL(10, 2) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_dados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consumo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gastos` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `consumo` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `usuarioEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
