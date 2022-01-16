import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConverterHistoryComponent } from './currency-converter-history/currency-converter-history.component';

const appRoutes:Routes=[
  {path:'index', component: CurrencyConverterComponent},
  {path:'history', component: CurrencyConverterHistoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyConverterHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    )
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
