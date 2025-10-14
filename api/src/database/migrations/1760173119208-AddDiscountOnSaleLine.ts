import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDiscountOnSaleLine1760173119208 implements MigrationInterface {
  name = 'AddDiscountOnSaleLine1760173119208'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."saleline" ADD "discount" numeric(5,2) NOT NULL DEFAULT '0'`,
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "easyinventory"."saleline" DROP COLUMN "discount"`,
    )
  }
}
