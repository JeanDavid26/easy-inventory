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
  saleId ?: number
}

interface ValidatePaymentDto {
  saleId ?: number
  paymentMethodId ?: number
  amout ?: number
}
