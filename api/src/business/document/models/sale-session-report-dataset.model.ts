export type ArticleLineData = {
  reference?: string
  name?: string
  unitPrice?: string
  quantity?: number
  
}
export type SaleData={
  clientId : number
  tArticleLine : ArticleLineData[]
  itemTotal?: string
  cashTotal?: string
  chequeTotal?: string
  cardTotal?: string
  unpaid?: string
}

export type SaleSessionReportDataset = {
  logo?: string
  company: {
    name: string
    address?: string
    email?: string
  }
  saleNumber?: string
  sales: SaleData[],
  saleDate : string
  totals: {
    items?: string
    cash?: string
    cheques?: string
    card?: string | null
  }
  startingCash?: string
  saleCode?: string
  codeAmount?: string
  totalSales?: string
  cashAfterSale?: string
}