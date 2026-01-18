import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeDocument1765740455819 implements MigrationInterface {
  name = 'ChangeDocument1765740455819'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_fb6e46d7f4a961178d059460bef"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "label"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "appfileid"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "salesessionid" integer`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "filename" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "originalname" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "mimetype" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "size" bigint NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "storagepath" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "metadata" jsonb`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ALTER COLUMN "inventoryid" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074" FOREIGN KEY ("inventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_0a82ee0d86fe325c753d91df73e" FOREIGN KEY ("salesessionid") REFERENCES "easyinventory"."salesession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_0a82ee0d86fe325c753d91df73e"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ALTER COLUMN "inventoryid" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074" FOREIGN KEY ("inventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "storagepath"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "size"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "mimetype"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "originalname"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "filename"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP COLUMN "salesessionid"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "appfileid" integer NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD "label" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_fb6e46d7f4a961178d059460bef" FOREIGN KEY ("appfileid") REFERENCES "easyinventory"."appfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

}
