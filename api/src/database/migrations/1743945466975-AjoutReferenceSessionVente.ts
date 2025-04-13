import { MigrationInterface, QueryRunner } from 'typeorm'

export class AjoutReferenceSessionVente1743945466975 implements MigrationInterface {
  name = 'AjoutReferenceSessionVente1743945466975'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."salesession" ADD "salesessionreference" character varying`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."salesession" DROP COLUMN "salesessionreference"`)
  }

}
