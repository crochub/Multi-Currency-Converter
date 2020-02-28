import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Rate } from '../models';

const EXCHANGE_RATES_API_URL = 'https://api.exchangeratesapi.io';

export interface FetchRatesParams {
  base: string;
  symbols?: string | string[];
}

export interface CurrencyRates {
  base: string;
  date: string;
  rates: Rate;
}

const RATE_PARAMS_DEFAULT: FetchRatesParams = {
  base: 'USD',
  symbols: ['USD', 'EUR', 'CZK']
};

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesApiService {

  constructor(private http: HttpClient) { }

  fetchLatestRates(ratesParams: FetchRatesParams = RATE_PARAMS_DEFAULT) {
    let params = new HttpParams();

    Object.keys(ratesParams).forEach(paramKey => params = params.append(paramKey, ratesParams[paramKey]));
    return this.http.get<CurrencyRates>(`${EXCHANGE_RATES_API_URL}/latest`, { params });
  }
}
