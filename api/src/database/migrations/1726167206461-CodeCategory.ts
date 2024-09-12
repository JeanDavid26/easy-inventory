import { MigrationInterface, QueryRunner } from 'typeorm'

export class CodeCategory1726167206461 implements MigrationInterface {
  name = 'CodeCategory1726167206461'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."category" ADD "code" character varying`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."category" DROP COLUMN "code"`)
  }

}
