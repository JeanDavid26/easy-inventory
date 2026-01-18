import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Inventory } from './Inventory.entity'
import { SaleSession } from './SaleSession.entity'
@Entity({ schema: 'easyinventory', name: 'document' })
export class Document extends BaseTable {
  @Column({ name: 'inventoryid', nullable : true })
  inventoryId : number | null

  @Column({ name: 'salesessionid', nullable : true })
  saleSessionId : number | null

  @Column({ name: 'filename' })
  fileName: string

  @Column({ name : 'originalname' })
  originalName: string

  @Column()
  mimetype: string

  @Column({ type: 'bigint' })
  size: number

  @Column({ name : 'storagepath' })
  storagePath: string

  @Column({ nullable: true, type : 'jsonb' })
  metadata: unknown

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'inventoryid' })
  oInventory: Inventory | null

  @ManyToOne(() => SaleSession, (session) => session.id)
  @JoinColumn({ name: 'salesessionid' })
  oSaleSession: SaleSession | null
}
