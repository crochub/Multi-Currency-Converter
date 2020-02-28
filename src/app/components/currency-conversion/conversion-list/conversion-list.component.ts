import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CurrencyConversion } from '../../../currency-converter-widget/models';
import { ConversionUtilsService } from '../../../currency-converter-widget/services/conversion-utils.service';

@Component({
  selector: 'mc-conversion-list',
  templateUrl: './conversion-list.component.html',
  styleUrls: ['./conversion-list.component.scss']
})
export class ConversionListComponent implements OnChanges {
  public conversationSum = 0;

  @Input() public conversions: CurrencyConversion[] = [];

  constructor(private conversionUtilsService: ConversionUtilsService) { }

  ngOnChanges({ conversions }: SimpleChanges) {
    if (conversions) {
      this.calculateConversationSum();
    }
  }

  private calculateConversationSum() {
    this.conversationSum = this.conversions.reduce(
      (acc, conversion) => {
        const conversionAmount = this.conversionUtilsService.convert(conversion.amount, conversion.sourceCurrency.rate);
        return this.conversionUtilsService.add(acc, conversionAmount);
      },
      0
    );
  }
}
