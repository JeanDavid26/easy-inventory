import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'easyinventory', name: 'paiementmethod' })
export class PaiementMethod {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label : string
}