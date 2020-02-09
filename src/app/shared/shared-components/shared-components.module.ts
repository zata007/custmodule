import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MaterialModule } from '../material-module/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationPopupComponent } from './location-popup/location-popup.component';
import { NotServicebleComponent } from './not-serviceble/not-serviceble.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PreRegisterComponent } from './pre-register/pre-register.component';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    SplashScreenComponent,
    LocationPopupComponent,
    LocationDialogComponent,
    NotServicebleComponent,
    PreRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
  })
  ],
  entryComponents: [LocationPopupComponent, LocationDialogComponent, NotServicebleComponent, PreRegisterComponent],
  exports: [SplashScreenComponent, NotServicebleComponent]
})
export class SharedComponentsModule { }
