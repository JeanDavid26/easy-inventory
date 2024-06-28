import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'easyinventory', name: 'paymentmethod' })
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label : string
}