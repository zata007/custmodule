import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MaterialModule } from '../material-module/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationPopupComponent } from './location-popup/location-popup.component';
import { NotServicebleComponent } from './not-serviceble/not-serviceble.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [SplashScreenComponent, LocationPopupComponent, LocationDialogComponent, NotServicebleComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ],
  entryComponents: [LocationPopupComponent, LocationDialogComponent, NotServicebleComponent],
  exports: [SplashScreenComponent, NotServicebleComponent]
})
export class SharedComponentsModule { }
