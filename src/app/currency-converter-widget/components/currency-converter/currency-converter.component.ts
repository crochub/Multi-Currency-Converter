import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Currency, CurrencyConversion } from '../../models';
import { ExchangeRatesApiService, CurrencyRates } from '../../services/exchange-rates-api.service';

const DEFAULT_BASE = 'USD';

@Component({
  selector: 'mc-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public base = DEFAULT_BASE;
  public currencies: Currency[] = [];
  public monetaryFormGroup: FormGroup;
  public conversion: CurrencyConversion;

  @Output() addConversion = new EventEmitter<CurrencyConversion>();

  constructor(
    private fb: FormBuilder,
    private exchangeRatesApiService: ExchangeRatesApiService
  ) {
    this.monetaryFormGroup = this.fb.group({
      amount: 1,
      currency: null
    });
  }

  ngOnInit() {
    this.monetaryFormGroup.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(({ amount, currency }) => {
          const parsedAmount = +amount;
          const normalizedAmount = isNaN(parsedAmount) || !isFinite(parsedAmount) ? 0 : parsedAmount;

          return { amount: normalizedAmount, currency };
        })
      )
      .subscribe(({ amount, currency }) => this.onFormValueChanged(amount, currency));

    this.exchangeRatesApiService
      .fetchLatestRates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(currencyRates => this.onRatesFetched(currencyRates));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  add() {
    if (this.conversion) {
      this.addConversion.emit(this.conversion);
    }
  }

  private onFormValueChanged(amount: number, currency: Currency) {
    if (!amount || !currency) {
      this.conversion = null;
      return;
    }

    this.conversion = {
      amount,
      sourceCurrency: currency,
      targetCurrencyName: this.base,
    };
  }

  private onRatesFetched({ base, rates }: CurrencyRates) {
    this.base = base;
    this.currencies = Object.keys(rates).map(name => ({ name, rate: rates[name] } as Currency));
    this.selectBaseCurrency();
  }

  private selectBaseCurrency() {
    const base = this.base || DEFAULT_BASE;
    const currencies = Array.isArray(this.currencies) ? this.currencies : [];
    const baseCurrency = currencies.find(currency => currency.name === base);

    this.monetaryFormGroup.patchValue({ currency: baseCurrency });
  }
}
