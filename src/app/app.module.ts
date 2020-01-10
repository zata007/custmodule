import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';
import { MaterialModule } from './shared/material-module/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AgmCoreModule } from '@agm/core';
import { JoyrideModule } from 'ngx-joyride';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const socketConfig: SocketIoConfig = { url: environment.SOCKET_API_Endpoint, options: { path: '/user/socket' } };

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
  SocketIoModule.forRoot(socketConfig),
  AgmCoreModule.forRoot({ apiKey: environment.mapApiKey, libraries: ['places', 'geometry'] }),
  JoyrideModule.forRoot(),
  SharedComponentsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
