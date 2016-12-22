// Entry point for JiT compilation.
export * from './polyfills';
export * from './vendor';
import './rxjs-operators';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
