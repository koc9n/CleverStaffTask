import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, MatDialogModule],
  providers: [provideAnimations(), provideHttpClient()]
})
export class MyApplicationModule {
  constructor(private appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    this.appRef.bootstrap(AppComponent);
  }
}
