import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NetWorthComponent } from './app/net-worth/net-worth.component';
import { MarketComponent } from './app/market/market.component';
import { HoldingsComponent } from './app/holdings/holdings.component';
import { InvestmentsComponent } from './app/investments/investments.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
