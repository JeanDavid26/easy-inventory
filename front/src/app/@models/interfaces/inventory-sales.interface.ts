export interface InventorySaleLine {
  articleId: number
  referenceCode: string
  label: string
  unitPrice: number
  quantity: number
  // Montant réellement encaissé (remises déduites)
  amount: number
}

export interface InventorySales {
  inventoryId: number
  inventoryLabel: string
  tLine: InventorySaleLine[]
  totalQuantity: number
  totalAmount: number
}
