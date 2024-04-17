import { Article } from "./Article.interface";
import { BaseTable } from "./BaseTable.interface";

export interface InventoryLine extends BaseTable {
  productId: number
  inventoryId: number
  quantity: number
  updateDate: Date
  oArticle: Article
}
