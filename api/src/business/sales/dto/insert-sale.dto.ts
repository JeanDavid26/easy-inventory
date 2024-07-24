import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { Payment } from 'src/database/entities/Payment.entity'
import { SaleLine } from 'src/database/entities/SaleLine.entity'

export class InsertSaleDto {
  @IsNotEmpty()
  saleSessionId : number

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ValidateSaleLineDto)
  tSaleLine : SaleLine[]

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ValidatePaymentDto)
  tPayment : Payment[]
  
  @IsNotEmpty()
  totalAmount : number
}

class ValidateSaleLineDto {
  @IsNotEmpty()
  articleId : number

  @IsNotEmpty()
  quantity : number

  @IsNotEmpty()
  salePrice : number

}

class ValidatePaymentDto {

  @IsNotEmpty()
  saleId : number

  @IsNotEmpty()
  paymentMethodId : number

  @IsNotEmpty()
  amount : number
}