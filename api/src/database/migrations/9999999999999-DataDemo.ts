import { MigrationInterface, QueryRunner } from 'typeorm'

export class DataDemo9999999999999 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO easyinventory.category (label) VALUES ($1)', [ 'Non classé' ])
    const tDataArticle = [
      {
        'referencecode': 'BB103',
        'label': 'Bible souple rouge texas',
        'unitprice': 16.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'BB105',
        'label': 'Bible rigide tranche or',
        'unitprice': 26.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'BB106',
        'label': 'Bible duo grande gris/blanc',
        'unitprice': 28.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'BB107',
        'label': 'Bible duo marron caramel/marron',
        'unitprice': 26.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'BB108',
        'label': 'Bible souple bordeaux',
        'unitprice': 18.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B621',
        'label': 'Achaque jour suffit 2',
        'unitprice': 19.95,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B622',
        'label': '100 noms de Dieu',
        'unitprice': 15,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B623',
        'label': "Oser s 'affirmer",
        'unitprice': 15.2,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B624',
        'label': 'Force Spirituelle',
        'unitprice': 24.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B625',
        'label': "100 gestes d'amitiés",
        'unitprice': 15,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B626',
        'label': 'De Saul de tarse',
        'unitprice': 24,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B627',
        'label': 'Atteindre le monde par la prière',
        'unitprice': 13,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B628',
        'label': 'En route pour le voyage',
        'unitprice': 15,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B629',
        'label': 'Vivre pour Jésus',
        'unitprice': 19.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B630',
        'label': 'Voudrais tu changer le monde Garçons',
        'unitprice': 8,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B631',
        'label': 'Voudrais tu changer le monde Filles',
        'unitprice': 8,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B632',
        'label': 'Boons la joie',
        'unitprice': 7.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B633',
        'label': 'Boons Unev excellente',
        'unitprice': 7.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B634',
        'label': "L'agenda pour une année",
        'unitprice': 15.9,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B635',
        'label': 'les guides bibliques pour tous',
        'unitprice': 12,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B636',
        'label': 'Les chroniques le vaisseau',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B637',
        'label': 'Les chroniques le retour',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B638',
        'label': 'Trop fort',
        'unitprice': 20.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B639',
        'label': 'Trop Bien',
        'unitprice': 20.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B640',
        'label': 'trop beau',
        'unitprice': 20.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B641',
        'label': 'Les chroniques les lunettes',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B642',
        'label': 'Chroniques',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B643',
        'label': 'Chroniques',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      },
      {
        'referencecode': 'B644',
        'label': 'Chroniques',
        'unitprice': 8.5,
        'barcode': '000000000',
        'categoryid': 1
      }
    ]
    const sql = 'INSERT INTO easyinventory.article (label, referencecode, barcode, unitprice, categoryid) VALUES ($1, $2,$3,$4,$5)'
    const tPromise = [] 
    tPromise.push(... tDataArticle.map(obj=> {
      return queryRunner.query(sql, [ obj.label, obj.referencecode, obj.barcode, obj.unitprice, obj.categoryid ])
    }))
    await Promise.all(tPromise)

  }

  public async down (_queryRunner: QueryRunner): Promise<void> {
    //
  }

}
