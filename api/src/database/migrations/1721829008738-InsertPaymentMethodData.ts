import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertPaymentMethodData1721829008738 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('INSERT INTO easyinventory.paymentmethod (id, label) VALUES ($1, $2)', [ 1, 'CB' ])
    await queryRunner.query('INSERT INTO easyinventory.paymentmethod (id, label) VALUES ($1, $2)', [ 2, 'Espèce' ])
    await queryRunner.query('INSERT INTO easyinventory.paymentmethod (id, label) VALUES ($1, $2)', [ 3, 'Chèque' ])
  }

  public async down (_queryRunner: QueryRunner): Promise<void> {
    //
  }

}
