import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStoreInfo1689806584777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(`store_info_tb`)) {
      await queryRunner.query(`
        ALTER TABLE \`store_info_tb\`
          ADD COLUMN \`si_id\` int unsigned NOT NULL AUTO_INCREMENT COMMENT "아이디" FIRST,
          DROP PRIMARY KEY,
          ADD PRIMARY KEY (\`si_id\`),
          ADD UNIQUE KEY (\`si_service_id\`);
      `);
    } else {
      await queryRunner.query(`
        CREATE TABLE \`store_info_tb\` (
          \`si_id\` int unsigned NOT NULL AUTO_INCREMENT COMMENT "아이디",
          \`si_service_id\` varchar(200) NOT NULL DEFAULT "" COMMENT "서비스 유일코드(s_uuidv4)",
          \`si_store_id\` varchar(20) NOT NULL DEFAULT "" COMMENT "상점 아이디",
          \`si_category\` tinyint(3) unsigned NOT NULL DEFAULT "0" COMMENT "상점 카테고리",
          \`si_email\` varchar(100) NOT NULL DEFAULT "" COMMENT "대표메일",
          \`si_name\` varchar(200) NOT NULL DEFAULT "" COMMENT "쇼핑몰명",
          \`si_phone\` varchar(50) NOT NULL DEFAULT "" COMMENT "대표번호",
          \`si_privacy_manager\` varchar(50) NOT NULL DEFAULT "" COMMENT "개인정보보호책임자",
          \`si_biz_hours\` varchar(100) NOT NULL DEFAULT "" COMMENT "영업시간",
          PRIMARY KEY (\`si_id\`),
          UNIQUE KEY (\`si_service_id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT="상점 기본 정보";
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`store_info_tb`, true);
  }
}