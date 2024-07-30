import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { MarketComponent } from './market/market.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { InvestmentsComponent } from './investments/investments.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NetWorthComponent,
MarketComponent,
HoldingsComponent,
InvestmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio Manager';
}
