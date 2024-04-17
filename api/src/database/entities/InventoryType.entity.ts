import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'easyinventory', name: 'invenotrytype' })
export class InventoryType {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label : string
}