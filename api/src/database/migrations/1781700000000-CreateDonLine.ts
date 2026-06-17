import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDonLine1781700000000 implements MigrationInterface {
  name = 'CreateDonLine1781700000000'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "easyinventory"."donline" (
        "id"            SERIAL PRIMARY KEY,
        "saleid"        INTEGER NOT NULL REFERENCES "easyinventory"."sale"("id"),
        "label"         VARCHAR(255) NOT NULL DEFAULT 'Don',
        "amount"        NUMERIC(10,2) NOT NULL,
        "creationdate"  TIMESTAMP NOT NULL DEFAULT now(),
        "deletedate"    TIMESTAMP
      )
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "easyinventory"."donline"`)
  }
}
