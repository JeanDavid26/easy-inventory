import { Article } from "./Article.interface";
import { BaseTable } from "./BaseTable.interface";

export interface Category extends BaseTable {
  label: string;
  code?: string
  tArticle?: Article[];
}
