import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTableArticle1728932461815 implements MigrationInterface {
  name = 'UpdateTableArticle1728932461815'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."article" ADD "isnotstorable" boolean NOT NULL DEFAULT false`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."article" DROP COLUMN "isnotstorable"`)
  }

}
