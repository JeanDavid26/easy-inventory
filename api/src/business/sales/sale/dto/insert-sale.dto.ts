import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { Payment } from 'src/database/entities/Payment.entity'
import { SaleLine } from 'src/database/entities/SaleLine.entity'
import { UnpaidSale } from 'src/database/entities/UnpaidSale.entity'

export class InsertSaleDto {
  @IsNotEmpty()
  saleSessionId : number

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ValidateSaleLineDto)
  tSaleLine : SaleLine[]

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ValidateUnpaidSaleRepaymentDto)
  tUnpaidSaleRepayment : Partial<UnpaidSale>[]

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

class ValidateUnpaidSaleRepaymentDto {

  @IsNotEmpty()
  id : number

  @IsNotEmpty()
  isPaid : boolean
}

class ValidatePaymentDto {

  @IsNotEmpty()
  paymentMethodId : number

  @IsNotEmpty()
  amount : number
}