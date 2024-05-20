import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateInventoryLine1715974527585 implements MigrationInterface {
  name = 'UpdateInventoryLine1715974527585'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ADD "articleId" integer NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" DROP CONSTRAINT "FK_9171715df0ec6cdd914a41bf437"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ALTER COLUMN "productid" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ADD CONSTRAINT "FK_9171715df0ec6cdd914a41bf437" FOREIGN KEY ("productid") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" DROP CONSTRAINT "FK_9171715df0ec6cdd914a41bf437"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ALTER COLUMN "productid" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ADD CONSTRAINT "FK_9171715df0ec6cdd914a41bf437" FOREIGN KEY ("productid") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" DROP COLUMN "articleId"`)
  }

}
