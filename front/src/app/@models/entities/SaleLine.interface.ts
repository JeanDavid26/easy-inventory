import { Article } from "./Article.interface";
import { BaseTable } from "./BaseTable.interface";
import { Sale } from "./Sale.interface";

export interface SaleLine extends BaseTable {
  saleId?: number
  articleId ?: number
  quantity?: number
  salePrice?: number
  oArticle ?: Article
  oSale?: Sale
}
