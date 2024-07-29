import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NetWorthComponent } from './app/net-worth/net-worth.component';

bootstrapApplication(NetWorthComponent, appConfig)
  .catch((err) => console.error(err));
