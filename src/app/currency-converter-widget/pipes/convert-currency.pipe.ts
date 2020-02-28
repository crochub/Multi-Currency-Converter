import { Pipe, PipeTransform } from '@angular/core';

import { CurrencyConversion } from '../models';
import { ConversionUtilsService } from '../services/conversion-utils.service';

@Pipe({
  name: 'convertCurrency'
})
export class ConvertCurrencyPipe implements PipeTransform {

  constructor(private conversionUtilsService: ConversionUtilsService) {}

  transform(value: CurrencyConversion) {
    if (!value) {
      return '0 USD';
    }

    const { amount, targetCurrencyName, sourceCurrency } = value;
    const conversionValue = this.conversionUtilsService.convert(amount, sourceCurrency.rate);
    return `${conversionValue} ${targetCurrencyName}`;
  }
}
