import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ValidateDonLineDto)
  tDonLine : ValidateDonLineDto[]

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

class ValidateDonLineDto {
  @IsOptional()
  @IsString()
  label : string

  @IsNotEmpty()
  amount : number
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