import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixSaleEntity1721836627909 implements MigrationInterface {
  name = 'FixSaleEntity1721836627909'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" RENAME COLUMN "totalAmount" TO "totalamount"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" DROP COLUMN "totalamount"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" ADD "totalamount" double precision NOT NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" DROP COLUMN "totalamount"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" ADD "totalamount" integer NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" RENAME COLUMN "totalamount" TO "totalAmount"`)
  }

}
