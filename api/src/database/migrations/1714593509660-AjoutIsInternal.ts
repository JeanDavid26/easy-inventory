import { MigrationInterface, QueryRunner } from 'typeorm'

export class AjoutIsInternal1714593509660 implements MigrationInterface {
  name = 'AjoutIsInternal1714593509660'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementtype" ADD "isinternal" boolean NOT NULL DEFAULT false`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementtype" DROP COLUMN "isinternal"`)
  }

}
