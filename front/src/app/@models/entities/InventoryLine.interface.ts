import { Article } from "./Article.interface";
import { BaseTable } from "./BaseTable.interface";

export interface InventoryLine extends BaseTable {
  articleId: number
  inventoryId: number
  quantity: number
  updateDate: Date
  oArticle: Article
}
