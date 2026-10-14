import { MigrationInterface, QueryRunner } from 'typeorm'

// Ajoute sur chaque ligne de vente le stock dans lequel l'article a été débité,
// pour garder l'historique des ventes par stock (relevés des dépôts).
export class AddInventoryOnSaleLine1781800000000 implements MigrationInterface {
  name = 'AddInventoryOnSaleLine1781800000000'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "easyinventory"."saleline"
      ADD COLUMN "inventoryid" INTEGER NULL REFERENCES "easyinventory"."inventory"("id")
    `)
    await queryRunner.query(`
      CREATE INDEX "IDX_saleline_inventoryid" ON "easyinventory"."saleline" ("inventoryid")
    `)

    // Reprise de l'historique, du plus fiable au moins fiable.

    // 1. L'article est présent dans un seul stock (ligne de stock non supprimée) : c'est celui qui a été débité.
    await queryRunner.query(`
      UPDATE "easyinventory"."saleline" sl
      SET "inventoryid" = il."inventoryid"
      FROM (
        SELECT "articleId", MIN("inventoryid") AS "inventoryid"
        FROM "easyinventory"."invenotryline"
        WHERE "deletedate" IS NULL
        GROUP BY "articleId"
        HAVING COUNT(DISTINCT "inventoryid") = 1
      ) il
      WHERE il."articleId" = sl."articleid"
        AND sl."inventoryid" IS NULL
    `)

    // 2. Sinon : stock de destination du dernier mouvement d'entrée de l'article avant la date de la session.
    await queryRunner.query(`
      UPDATE "easyinventory"."saleline" sl
      SET "inventoryid" = (
        SELECT im."destinationinventoryid"
        FROM "easyinventory"."movementline" ml
        JOIN "easyinventory"."inventorymovement" im ON im."id" = ml."movementid"
        WHERE ml."articleid" = sl."articleid"
          AND im."destinationinventoryid" IS NOT NULL
          AND im."dateTime" <= ss."creationdate"
        ORDER BY im."dateTime" DESC, im."id" DESC
        LIMIT 1
      )
      FROM "easyinventory"."sale" s
      JOIN "easyinventory"."salesession" ss ON ss."id" = s."salesessionid"
      WHERE s."id" = sl."saleid"
        AND sl."inventoryid" IS NULL
    `)

    // 3. Sinon : stock de destination du dernier mouvement d'entrée de l'article, quelle que soit sa date.
    await queryRunner.query(`
      UPDATE "easyinventory"."saleline" sl
      SET "inventoryid" = (
        SELECT im."destinationinventoryid"
        FROM "easyinventory"."movementline" ml
        JOIN "easyinventory"."inventorymovement" im ON im."id" = ml."movementid"
        WHERE ml."articleid" = sl."articleid"
          AND im."destinationinventoryid" IS NOT NULL
        ORDER BY im."dateTime" DESC, im."id" DESC
        LIMIT 1
      )
      WHERE sl."inventoryid" IS NULL
    `)

    // 4. Sinon : dernière ligne de stock connue de l'article, même supprimée.
    await queryRunner.query(`
      UPDATE "easyinventory"."saleline" sl
      SET "inventoryid" = (
        SELECT il."inventoryid"
        FROM "easyinventory"."invenotryline" il
        WHERE il."articleId" = sl."articleid"
        ORDER BY il."deletedate" DESC NULLS FIRST, il."id" DESC
        LIMIT 1
      )
      WHERE sl."inventoryid" IS NULL
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "easyinventory"."IDX_saleline_inventoryid"`)
    await queryRunner.query(`ALTER TABLE "easyinventory"."saleline" DROP COLUMN "inventoryid"`)
  }
}
