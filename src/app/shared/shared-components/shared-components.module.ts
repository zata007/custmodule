import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MaterialModule } from '../material-module/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationPopupComponent } from './location-popup/location-popup.component';



@NgModule({
  declarations: [SplashScreenComponent, LocationPopupComponent, LocationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  entryComponents: [LocationPopupComponent, LocationDialogComponent],
  exports: [SplashScreenComponent]
})
export class SharedComponentsModule { }
