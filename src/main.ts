import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyApplicationModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(MyApplicationModule)
  .catch(err => console.error(err));
