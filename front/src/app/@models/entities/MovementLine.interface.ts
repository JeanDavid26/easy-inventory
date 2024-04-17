import { Article } from "./Article.interface";
import { BaseTable } from "./BaseTable.interface";
import { InventoryMovement } from "./InventoryMovement.interface";

export interface MovementLine extends BaseTable {
  movementId?: number;
  articleId?: number;
  quantity?: number;
  oInventoryMovement?: InventoryMovement;
  oArticle?: Article;
}
