import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixSaleSessionId1721838462229 implements MigrationInterface {
  name = 'FixSaleSessionId1721838462229'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" DROP CONSTRAINT "FK_e24e22cdeca91fc85245a2af728"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" DROP COLUMN "saleSessionId"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" ADD CONSTRAINT "FK_e03844da523b570d606eb5f0dfd" FOREIGN KEY ("salesessionid") REFERENCES "easyinventory"."salesession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" DROP CONSTRAINT "FK_e03844da523b570d606eb5f0dfd"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" ADD "saleSessionId" integer`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."sale" ADD CONSTRAINT "FK_e24e22cdeca91fc85245a2af728" FOREIGN KEY ("saleSessionId") REFERENCES "easyinventory"."salesession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

}
