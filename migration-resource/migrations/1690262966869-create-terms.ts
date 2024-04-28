import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTerms1690262966869 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`terms_tb\` (
        \`t_id\` int unsigned NOT NULL AUTO_INCREMENT,
        \`t_store_info_id\` int unsigned NOT NULL DEFAULT "0" COMMENT "등록 스토어 아이디. store_info_tb pk",
        \`t_adminuser_id\` int unsigned NOT NULL DEFAULT "0" COMMENT "등록 관리자 아아디. adminuser_tb pk",
        \`t_type\` varchar(20) NOT NULL DEFAULT "" COMMENT "약관 종류",
        \`t_content\` text NOT NULL COMMENT "약관 내용",
        \`t_refusal_statement\` varchar(100) NOT NULL DEFAULT "" COMMENT "거부권 문구",
        \`t_visibility\` enum("Y","N") NOT NULL DEFAULT "N" COMMENT "노출 여부",
        \`t_agree_use\` enum("Y","N") NOT NULL DEFAULT "N" COMMENT "동의 기능 사용 여부",
        \`t_mandatory_agree\` enum("Y","N") NOT NULL DEFAULT "N" COMMENT "필수 동의 여부",
        \`t_execute_date\` date DEFAULT NULL COMMENT "시행일",
        \`t_register_ip\` varchar(32) NOT NULL DEFAULT "" COMMENT "작성자 IP",
        \`t_created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT "등록일시",
        PRIMARY KEY (\`t_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT="쇼핑몰 약관 테이블";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`terms_tb`, true);
  }
}
