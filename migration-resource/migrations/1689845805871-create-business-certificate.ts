import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBusinessCertificate1689845805871 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable(`business_certificate_tb`))) {
      await queryRunner.query(`
        CREATE TABLE business_certificate_tb (
          bc_id INT NOT NULL AUTO_INCREMENT COMMENT "사업자 인증 AI값",
          bc_store_info_id INT UNSIGNED NOT NULL COMMENT "상점 고유 번호, store_info_tb pk",
          bc_business_type ENUM("individual","corporate") NOT NULL DEFAULT "individual" COMMENT "사업자구분(개인/법인)",
          bc_business_number VARCHAR(20) NOT NULL DEFAULT "" COMMENT "사업자번호",
          bc_business_name VARCHAR(40) NOT NULL DEFAULT "" COMMENT "상호",
          bc_category VARCHAR(150) NOT NULL DEFAULT "" COMMENT "사업자 주종목명",
          bc_sector VARCHAR(50) NOT NULL DEFAULT "" COMMENT "사업자 주업태명",
          bc_owner_name VARCHAR(50) NOT NULL DEFAULT "" COMMENT "사업자 대표자명",
          bc_owner_second_name VARCHAR(50) NOT NULL DEFAULT "" COMMENT "사업자 대표자명 2",
          bc_zipcode VARCHAR(6) NOT NULL DEFAULT "" COMMENT "사업장 우편번호",
          bc_address VARCHAR(255) NOT NULL DEFAULT "" COMMENT "사업장 주소",
          bc_address_detail VARCHAR(255) NOT NULL DEFAULT "" COMMENT "사업장 상세 주소",
          bc_certificate_status ENUM("wait","done","pend") NOT NULL DEFAULT "wait" COMMENT "인증 상태",
          bc_use ENUM("use","unuse") NOT NULL DEFAULT "use" COMMENT "사업자 정보 사용여부",
          bc_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "생성일시",
          bc_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT "수정일시",
          PRIMARY KEY (bc_id),
          INDEX idx_store_info_id (bc_store_info_id)
        ) COMMENT="사업자 인증 정보" CHARSET="utf8mb4" ENGINE=InnoDB;
      `);
    } else {
      console.log('hasTable business_certificate_tb');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`business_certificate_tb`, true);
  }

}
