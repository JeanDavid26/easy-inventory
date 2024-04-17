import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseTable } from './BaseTable'
import { InventoryTypeEnum } from '../@models/inventory-type.enum'
import { Document } from './Document.entity'
import { InventoryLine } from './InventoryLine.entity'
import { InventoryMovement } from './InventoryMovement.entity'
import { InventoryType } from './InventoryType.entity'

@Entity({ schema: 'easyinventory', name: 'inventory' })
export class Inventory extends BaseTable {
  @Column()
  label: string

  @Column({ name : 'inventorytypeid' })
  inventoryTypeId: number

  @ManyToOne(()=> InventoryType, (inventoryType) => inventoryType.id)
  @JoinColumn({ name : 'inventorytypeid' })
  oInventoryType : InventoryType
  
  @OneToMany(() => Document, (document) => document.oInventory)
  tDocument: Document[]

  @OneToMany(() => InventoryLine, (inventoryLine) => inventoryLine.oInventory)
  tInventoryLine: InventoryLine[]

  @OneToMany(() => InventoryMovement, (inventoryMovement) => inventoryMovement.oSourceInventory)
  tInventoryMovementSource: InventoryMovement[]

  @OneToMany(() => InventoryMovement, (inventoryMovement) => inventoryMovement.oDestinationInventory)
  tInventoryMovementDestination: InventoryMovement[]

  value?: number
  quantity?: number
}
