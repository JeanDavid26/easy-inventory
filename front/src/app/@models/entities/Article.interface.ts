import { BaseTable } from "./BaseTable.interface";
import { Category } from "./Category.interface";
import { InventoryLine } from "./InventoryLine.interface";

export interface Article extends BaseTable {
  label: string;
  referenceCode: string;
  barCode: string;
  unitPrice: number;
  categoryId: number;
  oCategory?: Category;
  tInventoryLine? : InventoryLine[]
}
