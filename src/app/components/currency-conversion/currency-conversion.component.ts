import { Component } from '@angular/core';

import { CurrencyConversion } from '../../currency-converter-widget/models';

@Component({
  selector: 'mc-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.scss']
})
export class CurrencyConversionComponent {
  public conversions: CurrencyConversion[] = [];

  constructor() { }

  public onAdd(conversion: CurrencyConversion) {
    this.conversions = [...this.conversions, conversion];
  }
}
