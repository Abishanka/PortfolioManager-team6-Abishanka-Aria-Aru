import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NetWorthComponent } from './app/net-worth/net-worth.component';

import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(NetWorthComponent, config);

export default bootstrap;
