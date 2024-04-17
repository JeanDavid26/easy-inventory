import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Inventory } from './Inventory.entity'
import { MovementType } from './MovementType.entity'

@Entity({ schema: 'easyinventory', name: 'inventorymovement' })
export class InventoryMovement extends BaseTable {

  @Column()
  reference: string

  @Column({ name : 'movementtypeid' })
  movementTypeId: number

  @Column()
  dateTime: Date

  @Column({ name: 'sourceinventoryid', nullable: true })
  sourceInventoryId: number

  @Column({ name: 'destinationinventoryid', nullable: true })
  destinationInventoryId: number

  @ManyToOne(() => MovementType, (movementType) => movementType.id)
  @JoinColumn({ name: 'movementtypeid' })
  oMovementType: MovementType

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'sourceinventoryid' })
  oSourceInventory: Inventory

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'destinationinventoryid' })
  oDestinationInventory: Inventory
}
