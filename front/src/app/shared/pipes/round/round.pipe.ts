import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): any {
    if (isNaN(value)) {
      return value;
    }
    return value.toFixed(decimals);
  }

}
