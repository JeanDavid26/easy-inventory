import { Injectable } from '@nestjs/common'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service'
import { Inventory } from 'src/database/entities/Inventory.entity'

@Injectable()
export class InventoryService {
  constructor (private _inventoryManagerService: InventoryManagerService, private _inventoryLineManagerService: InventoryLineManagerService) { }

  public async list (): Promise<Inventory[]> {
    const tInventory = (await this._inventoryManagerService.list()).map(inventory => {

      const resValueQuantity = this._getValueQuantityInventory(inventory)
      return {
        ...inventory,
        value: resValueQuantity.value,
        quantity: resValueQuantity.quantity
      }
    })

    return tInventory
  }

  public async get (id: number): Promise<Inventory> {
    const inventory = await this._inventoryManagerService.get(id)
    return inventory
  }

  public async delete (id: number): Promise<void> {
    const inventory = await this._inventoryManagerService.get(id)
    const tPromise = []

    for (const line of inventory.tInventoryLine) {
      tPromise.push(this._inventoryLineManagerService.delete(line.id))
    }

    await Promise.all(tPromise)
    await this._inventoryManagerService.delete(id)
  }

  private _getValueQuantityInventory (oInventory: Inventory): { value: number, quantity: number } {
    let value = 0
    let quantity = 0
    oInventory.tInventoryLine.forEach(inventoryLine => {
      value += inventoryLine.oArticle?.unitPrice ?? 0 * inventoryLine.quantity
      quantity += inventoryLine.quantity
    })
    return { value, quantity }
  }

}
