import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1713384617439 implements MigrationInterface {
  name = 'CreateTables1713384617439'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "easyinventory"."sale" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "saleDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."saleline" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "saleid" integer NOT NULL, "quantity" integer NOT NULL, "saleprice" numeric(10,2) NOT NULL, CONSTRAINT "PK_a1ce7fada72dbc025aa35fb3be1" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."movementtype" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_c01495a41425fe7dba9ec0d0d16" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."user" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."invenotrytype" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_48f660aa16abfc3f0ea84aec968" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."appfile" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "originalname" character varying NOT NULL, "path" character varying NOT NULL, "contenttype" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_78c4d91c302a887d1197453e21b" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."document" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "label" character varying NOT NULL, "appfileid" integer NOT NULL, "inventoryid" integer NOT NULL, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."category" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "label" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."article" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "label" character varying NOT NULL, "referencecode" character varying NOT NULL, "barcode" character varying, "unitprice" double precision NOT NULL, "categoryid" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."invenotryline" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "productid" integer NOT NULL, "inventoryid" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_876ed3fe70f18de3cd098f10b9f" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."inventory" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "label" character varying NOT NULL, "inventorytypeid" integer NOT NULL, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."inventorymovement" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "reference" character varying NOT NULL, "movementtypeid" integer NOT NULL, "dateTime" TIMESTAMP NOT NULL, "sourceinventoryid" integer, "destinationinventoryid" integer, CONSTRAINT "PK_063823e9c7677abeb00ac898554" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "easyinventory"."movementline" ("id" SERIAL NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "deletedate" TIMESTAMP, "movementid" integer NOT NULL, "articleid" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_8f68345b4fb5b173c69da5488fb" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."saleline" ADD CONSTRAINT "FK_101478860945c0e61330b72760c" FOREIGN KEY ("saleid") REFERENCES "easyinventory"."sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_fb6e46d7f4a961178d059460bef" FOREIGN KEY ("appfileid") REFERENCES "easyinventory"."appfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" ADD CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074" FOREIGN KEY ("inventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."article" ADD CONSTRAINT "FK_161bfd30037ed15240f5808af4d" FOREIGN KEY ("categoryid") REFERENCES "easyinventory"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ADD CONSTRAINT "FK_9171715df0ec6cdd914a41bf437" FOREIGN KEY ("productid") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" ADD CONSTRAINT "FK_08ce595edc00064a18d72c2656c" FOREIGN KEY ("inventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventory" ADD CONSTRAINT "FK_b3b840ea9f1afd2bc7582b38cf2" FOREIGN KEY ("inventorytypeid") REFERENCES "easyinventory"."invenotrytype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" ADD CONSTRAINT "FK_b4ed332860f506346f14d8f4584" FOREIGN KEY ("movementtypeid") REFERENCES "easyinventory"."movementtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" ADD CONSTRAINT "FK_4703b22e33f1c23ff8a0f8372d0" FOREIGN KEY ("sourceinventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" ADD CONSTRAINT "FK_c2b67e217dfeec40ea85e1bcb15" FOREIGN KEY ("destinationinventoryid") REFERENCES "easyinventory"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementline" ADD CONSTRAINT "FK_6901b22c52c1f8c3ccee1e56725" FOREIGN KEY ("movementid") REFERENCES "easyinventory"."inventorymovement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementline" ADD CONSTRAINT "FK_e980c25cf02287e21d03519c185" FOREIGN KEY ("articleid") REFERENCES "easyinventory"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementline" DROP CONSTRAINT "FK_e980c25cf02287e21d03519c185"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."movementline" DROP CONSTRAINT "FK_6901b22c52c1f8c3ccee1e56725"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" DROP CONSTRAINT "FK_c2b67e217dfeec40ea85e1bcb15"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" DROP CONSTRAINT "FK_4703b22e33f1c23ff8a0f8372d0"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventorymovement" DROP CONSTRAINT "FK_b4ed332860f506346f14d8f4584"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."inventory" DROP CONSTRAINT "FK_b3b840ea9f1afd2bc7582b38cf2"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" DROP CONSTRAINT "FK_08ce595edc00064a18d72c2656c"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."invenotryline" DROP CONSTRAINT "FK_9171715df0ec6cdd914a41bf437"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."article" DROP CONSTRAINT "FK_161bfd30037ed15240f5808af4d"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_81b29a7ddc3b28b7fc759c97074"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."document" DROP CONSTRAINT "FK_fb6e46d7f4a961178d059460bef"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."saleline" DROP CONSTRAINT "FK_101478860945c0e61330b72760c"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."movementline"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."inventorymovement"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."inventory"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."invenotryline"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."article"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."category"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."document"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."appfile"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."invenotrytype"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."user"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."movementtype"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."saleline"`)
    await queryRunner.query(`DROP TABLE "easyinventory"."sale"`)
  }

}
