/*
 * Vérification « à blanc » de la migration AddInventoryOnSaleLine1781800000000.
 *
 * Joue la migration dans une transaction sur la base configurée (.env / variables TYPEORM_*),
 * affiche comment chaque ligne de vente a été rattachée à un stock, puis ANNULE tout (ROLLBACK).
 * Aucune donnée n'est modifiée.
 *
 * Usage : npm run migration:check-saleline-inventory
 */
const path = require('path')

const root = path.resolve(__dirname, '..')
const datasource = require(path.join(root, 'dist/ormconfig.js')).default
const { AddInventoryOnSaleLine1781800000000 } = require(path.join(root, 'dist/src/database/migrations/1781800000000-AddInventoryOnSaleLine.js'))

const STEPS = [
  'Article présent dans un seul stock',
  'Dernier mouvement d\'entrée avant la session',
  'Dernier mouvement d\'entrée (toutes dates)',
  'Dernière ligne de stock connue (même supprimée)'
]

const countNull = (qr) => qr.query(`SELECT COUNT(*)::int AS n FROM "easyinventory"."saleline" WHERE "inventoryid" IS NULL`).then(r => r[0].n)

async function main () {
  datasource.setOptions({ migrationsRun: false })
  await datasource.initialize()
  const qr = datasource.createQueryRunner()

  try {
    const [ { exists } ] = await qr.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'easyinventory' AND table_name = 'saleline' AND column_name = 'inventoryid'
      ) AS exists`)
    if (exists) {
      console.log('La colonne saleline.inventoryid existe déjà : la migration a déjà été appliquée sur cette base.')
      return
    }

    await qr.startTransaction()

    const [ { total } ] = await qr.query(`SELECT COUNT(*)::int AS total FROM "easyinventory"."saleline"`)

    // On intercepte les requêtes de la migration pour mesurer l'effet de chaque étape de reprise
    const resolvedBySteps = []
    let updateIndex = 0
    let remaining = total
    const proxy = {
      query: async (sql, params) => {
        const result = await qr.query(sql, params)
        if (/^\s*UPDATE/i.test(sql)) {
          const nullCount = await countNull(qr)
          resolvedBySteps.push({ step: STEPS[updateIndex] ?? `Étape ${updateIndex + 1}`, lines: remaining - nullCount })
          remaining = nullCount
          updateIndex++
        }
        return result
      }
    }
    await new AddInventoryOnSaleLine1781800000000().up(proxy)

    console.log(`\nLignes de vente : ${total}\n`)
    console.log('Rattachement par règle :')
    console.table(resolvedBySteps)
    console.log(`Sans stock après migration : ${remaining}`)

    if (remaining > 0) {
      const tUnresolved = await qr.query(`
        SELECT sl."id" AS "saleLineId", a."referencecode" AS "reference", a."label", a."isnotstorable" AS "nonStockable", sl."quantity"
        FROM "easyinventory"."saleline" sl
        JOIN "easyinventory"."article" a ON a."id" = sl."articleid"
        WHERE sl."inventoryid" IS NULL
        ORDER BY sl."id"
        LIMIT 20`)
      console.log('Exemples de lignes sans stock (20 max) :')
      console.table(tUnresolved)
    }

    const [ { multiStock } ] = await qr.query(`
      SELECT COUNT(*)::int AS "multiStock" FROM (
        SELECT "articleId" FROM "easyinventory"."invenotryline"
        WHERE "deletedate" IS NULL GROUP BY "articleId" HAVING COUNT(DISTINCT "inventoryid") > 1
      ) t`)
    console.log(`\nArticles présents dans plusieurs stocks actuellement : ${multiStock}`)

    console.log('\nRépartition des ventes (non supprimées) par stock :')
    console.table(await qr.query(`
      SELECT COALESCE(i."label", '(aucun)') AS "stock", COUNT(*)::int AS "lignes", SUM(sl."quantity")::int AS "exemplaires"
      FROM "easyinventory"."saleline" sl
      LEFT JOIN "easyinventory"."inventory" i ON i."id" = sl."inventoryid"
      WHERE sl."deletedate" IS NULL
      GROUP BY 1 ORDER BY 3 DESC`))
  } finally {
    if (qr.isTransactionActive) {
      await qr.rollbackTransaction()
      console.log('\nROLLBACK effectué : aucune donnée n\'a été modifiée.')
    }
    await qr.release()
    await datasource.destroy()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
