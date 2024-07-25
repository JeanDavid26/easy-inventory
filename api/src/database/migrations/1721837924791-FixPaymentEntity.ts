import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixPaymentEntity1721837924791 implements MigrationInterface {
  name = 'FixPaymentEntity1721837924791'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."payment" DROP COLUMN "amount"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."payment" ADD "amount" double precision NOT NULL`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."payment" DROP COLUMN "amount"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."payment" ADD "amount" integer NOT NULL`)
  }

}
