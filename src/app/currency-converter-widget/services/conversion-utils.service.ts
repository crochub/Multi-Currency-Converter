import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionUtilsService {

  constructor() { }

  convert(amount: number, rate: number) {
    const normalizedAmount = Math.round(amount * 100);
    const normalizedRate =  Math.round(rate * 100);

    return Math.round((normalizedAmount / normalizedRate) * 100) / 100;
  }

  add(a: number, b: number) {
    const normalizedA = Math.round(a * 100);
    const normalizedB =  Math.round(b * 100);

    return (normalizedA + normalizedB) / 100;
  }
}
