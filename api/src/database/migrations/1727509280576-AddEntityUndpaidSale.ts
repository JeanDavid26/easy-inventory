import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddEntityUndpaidSale1727509280576 implements MigrationInterface {
  name = 'AddEntityUndpaidSale1727509280576'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "easyinventory"."unpaidsale" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "saleid" integer NOT NULL, "ispaid" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f957a30557c9015dd431eaaa52c" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" ADD CONSTRAINT "FK_371119b1a9dc1aca63f1169dd5c" FOREIGN KEY ("saleid") REFERENCES "easyinventory"."sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query('INSERT INTO easyinventory.paymentmethod (id, label) VALUES ($1, $2)', [ 4, 'Impayé' ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."unpaidsale" DROP CONSTRAINT "FK_371119b1a9dc1aca63f1169dd5c"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."unpaidsale"`)
  }

}
