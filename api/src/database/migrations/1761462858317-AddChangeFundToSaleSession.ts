import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddChangeFundToSaleSession1761462858317 implements MigrationInterface {
  name = 'AddChangeFundToSaleSession1761462858317'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."salesession" ADD "changeFund" numeric(5,2)`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."salesession" DROP COLUMN "changeFund"`)
  }

}
