import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../module/material.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SplashScreenComponent, LandingPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  exports: [SplashScreenComponent, LandingPageComponent]
})
export class SharedComponentsModule { }
