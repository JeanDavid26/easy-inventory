export interface SaleStats {
  tBestSeller: { articleId: number, label: string, referenceCode: string, quantity: number }[]
  tCategory: { categoryId: number, label: string, quantity: number }[]
}
