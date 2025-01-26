import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [AppComponent, BrowserModule, HttpClientModule, MatDialogModule, NoopAnimationsModule],
  providers: []
})
export class MyApplicationModule {
  constructor(private appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    this.appRef.bootstrap(AppComponent);
  }
}
