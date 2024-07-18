import { ToastrModule, provideToastr } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loaderComponent/loader/loader.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [provideToastr(),provideEnvironmentNgxMask(maskConfig)],
  bootstrap: [AppComponent],
})
export class AppModule {}
