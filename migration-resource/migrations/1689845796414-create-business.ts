import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBusiness1689845796414 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable(`business_tb`))) {
      await queryRunner.query(`
        CREATE TABLE business_tb (
          b_store_info_id INT UNSIGNED NOT NULL COMMENT "상점 고유 번호, store_info_tb pk",
          b_represent_business_certificate_id INT UNSIGNED NOT NULL COMMENT "사업자 인증 고유 번호, business_certificate_tb pk",
          b_change_business_certificate_id INT UNSIGNED NOT NULL COMMENT "사업자 인증 고유 번호, business_certificate_tb pk",
          b_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "생성일시",
          b_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT "수정일시",
          PRIMARY KEY (b_store_info_id) USING BTREE
        ) COMMENT="사업자 정보" CHARSET="utf8mb4" ENGINE=InnoDB; 
      `);
    } else {
      console.log('hasTable business_tb');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`business_tb`, true);
  }

}
