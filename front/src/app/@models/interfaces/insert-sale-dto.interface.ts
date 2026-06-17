export interface InsertSaleDto {
  saleSessionId ?: number
  tSaleLine ?: ValidateSaleLineDto[]
  tDonLine ?: ValidateDonLineDto[]
  tPayment ?: ValidatePaymentDto[]
  totalAmount ?: number
}

interface ValidateSaleLineDto {
  articleId ?: number
  quantity ?: number
  salePrice ?: number
}

interface ValidateDonLineDto {
  label ?: string
  amount ?: number
}

interface ValidatePaymentDto {
  paymentMethodId ?: number
  amount ?: number
}
