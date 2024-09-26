import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddOrganization1727039310653 implements MigrationInterface {
  name = 'AddOrganization1727039310653'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "easyinventory"."organization" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "label" character varying NOT NULL, "useridowner" integer, CONSTRAINT "REL_3468440fbdf97f6f58956549f4" UNIQUE ("useridowner"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."user" ADD "organizationid" integer`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."organization" ADD CONSTRAINT "FK_3468440fbdf97f6f58956549f4d" FOREIGN KEY ("useridowner") REFERENCES "easyinventory"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."user" ADD CONSTRAINT "FK_ea77f9e816add3c627c8375fd7b" FOREIGN KEY ("organizationid") REFERENCES "easyinventory"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  
    const data = { label : 'AJEF', userOwner : 1 }
    await queryRunner.query('INSERT INTO easyinventory.organization (label, useridowner) VALUES ($1, $2)', [ data.label, data.userOwner ])
    await queryRunner.query('UPDATE easyinventory.user SET organizationid = 1')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."user" DROP CONSTRAINT "FK_ea77f9e816add3c627c8375fd7b"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."organization" DROP CONSTRAINT "FK_3468440fbdf97f6f58956549f4d"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."user" DROP COLUMN "organizationid"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."organization"`)
  }

}
