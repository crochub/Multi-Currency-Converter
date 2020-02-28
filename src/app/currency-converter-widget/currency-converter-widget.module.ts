import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

import { ConvertCurrencyPipe } from './pipes/convert-currency.pipe';
import { AmountMaskDirective } from './directives/amount-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [
    CurrencyConverterComponent,
    ConvertCurrencyPipe,
    AmountMaskDirective
  ],
  exports: [
    CurrencyConverterComponent,
    ConvertCurrencyPipe
  ]
})
export class CurrencyConverterWidgetModule { }
