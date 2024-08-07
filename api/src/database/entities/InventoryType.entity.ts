import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'easyinventory', name: 'inventorytype' })
export class InventoryType {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label : string
}