import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUnpaidSale1727511033937 implements MigrationInterface {
  name = 'UpdateUnpaidSale1727511033937'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" ADD "saleidrepayment" integer`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" ADD CONSTRAINT "FK_86ec30993defbf1de2b37b4b121" FOREIGN KEY ("saleidrepayment") REFERENCES "easyinventory"."sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" DROP CONSTRAINT "FK_86ec30993defbf1de2b37b4b121"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" DROP COLUMN "saleidrepayment"`)
  }

}
