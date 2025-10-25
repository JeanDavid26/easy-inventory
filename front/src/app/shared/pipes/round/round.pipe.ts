import { Pipe, PipeTransform } from '@angular/core';
import Decimal from 'decimal.js';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): any {
    if (isNaN(value)) {
      return value;
    }
    return new Decimal(value).toFixed(decimals);
  }

}
