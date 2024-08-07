export interface InsertSaleDto {

  saleSessionId ?: number
  tSaleLine ?: ValidateSaleLineDto[]
  tPayment ?: ValidatePaymentDto[]
  totalAmount ?: number
}

interface ValidateSaleLineDto {
  articleId ?: number
  quantity ?: number
  salePrice ?: number
}

interface ValidatePaymentDto {
  paymentMethodId ?: number
  amount ?: number
}
