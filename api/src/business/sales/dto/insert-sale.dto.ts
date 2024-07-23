import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { SaleLine } from "src/database/entities/SaleLine.entity";
import { Payment } from "src/database/entities/payment.entity";

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

  @IsNotEmpty()
  saleId : number

}

class ValidatePaymentDto {

  @IsNotEmpty()
  saleId : number

  @IsNotEmpty()
  paymentMethodId : number

  @IsNotEmpty()
  amout : number
}