import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { CurrencyConverterWidgetModule } from './currency-converter-widget/currency-converter-widget.module';

import { AppComponent } from './app.component';
import { CurrencyConversionComponent } from './components/currency-conversion/currency-conversion.component';
import { ConversionListComponent } from './components/currency-conversion/conversion-list/conversion-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConversionComponent,
    ConversionListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    CurrencyConverterWidgetModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
