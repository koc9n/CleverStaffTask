import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, MatDialogModule],
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(MatInputModule, MatFormFieldModule, MatTableModule)
  ]
})
export class MyApplicationModule implements DoBootstrap {
  constructor(private appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    this.appRef.bootstrap(AppComponent);
  }
}
