import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { MarketComponent } from './market/market.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { InvestmentsComponent } from './investments/investments.component';
import { PerformanceGraphComponent } from './performance-graph/performance-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    NetWorthComponent,
    MarketComponent,
    HoldingsComponent,
    InvestmentsComponent,
    PerformanceGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
