import { Currency } from './currency.model';

export interface CurrencyConversion {
  amount: number;
  targetCurrencyName: string;
  sourceCurrency: Currency;
}
