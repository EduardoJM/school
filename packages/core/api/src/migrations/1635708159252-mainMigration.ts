import {MigrationInterface, QueryRunner} from "typeorm";

export class mainMigration1635708159252 implements MigrationInterface {
    name = 'mainMigration1635708159252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`state\` (\`code\` int NOT NULL, \`uf\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lat\` float(8) NOT NULL, \`long\` float(8) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`city\` (\`code\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`lat\` float(8) NOT NULL, \`long\` float(8) NOT NULL, \`stateCode\` int NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, UNIQUE INDEX \`REL_b35463776b4a11a3df3c30d920\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(180) NOT NULL, \`displayName\` varchar(80) NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NULL, \`useGravatar\` tinyint NOT NULL DEFAULT 1, \`avatar\` varchar(250) NULL DEFAULT '', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, UNIQUE INDEX \`REL_f8a889c4362d78f056960ca6da\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(120) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL, \`subjectId\` int NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inventare\`.\`subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(120) NOT NULL, \`icon\` varchar(150) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL, UNIQUE INDEX \`IDX_d011c391e37d9a5e63e8b04c97\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`city\` ADD CONSTRAINT \`FK_c789793143da74f33b0e6c3592b\` FOREIGN KEY (\`stateCode\`) REFERENCES \`inventare\`.\`state\`(\`code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`inventare\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`admin\` ADD CONSTRAINT \`FK_f8a889c4362d78f056960ca6dad\` FOREIGN KEY (\`userId\`) REFERENCES \`inventare\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`tag\` ADD CONSTRAINT \`FK_88cf9cba00581ee6e0e18160d23\` FOREIGN KEY (\`subjectId\`) REFERENCES \`inventare\`.\`subject\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`tag\` DROP FOREIGN KEY \`FK_88cf9cba00581ee6e0e18160d23\``);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`admin\` DROP FOREIGN KEY \`FK_f8a889c4362d78f056960ca6dad\``);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`ALTER TABLE \`inventare\`.\`city\` DROP FOREIGN KEY \`FK_c789793143da74f33b0e6c3592b\``);
        await queryRunner.query(`DROP INDEX \`IDX_d011c391e37d9a5e63e8b04c97\` ON \`inventare\`.\`subject\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`inventare\`.\`tag\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`tag\``);
        await queryRunner.query(`DROP INDEX \`REL_f8a889c4362d78f056960ca6da\` ON \`inventare\`.\`admin\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`inventare\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`inventare\`.\`student\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`student\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`city\``);
        await queryRunner.query(`DROP TABLE \`inventare\`.\`state\``);
    }

}
