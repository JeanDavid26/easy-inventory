import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { AppFile } from './AppFile.entity'
import { Inventory } from './Inventory.entity'

@Entity({ schema: 'easyinventory', name: 'document' })
export class Document extends BaseTable {
  @Column()
  label: string

  @Column({ name: 'appfileid' })
  appFileId: number

  @Column({ name: 'inventoryid' })
  inventoryId: number

  @ManyToOne(() => AppFile, (article) => article.tDocument)
  @JoinColumn({ name: 'appfileid' })
  oAppFile: AppFile

  @ManyToOne(() => Inventory, (inventory) => inventory.tDocument)
  @JoinColumn({ name: 'inventoryid' })
  oInventory: Inventory
}
