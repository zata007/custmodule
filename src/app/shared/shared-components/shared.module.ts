import { NgModule } from '@angular/core';
import { CarousalComponent, MaterialModule, LoaderComponent, PageNotFoundComponent, TermsAndConditionComponent } from './index';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardSliderComponent } from './card-slider/card-slider.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { DialogPreOrderComponent } from './dialog-pre-order/dialog-pre-order.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule, SwiperModule, MaterialModule],
  exports: [
    CarousalComponent,
    LoaderComponent,
    MaterialModule,
    PageNotFoundComponent,
    TermsAndConditionComponent,
    CardSliderComponent,
    DialogPreOrderComponent,
  ],
  declarations: [
    CarousalComponent,
    LoaderComponent,
    PageNotFoundComponent,
    TermsAndConditionComponent,
    CardSliderComponent,
    DialogPreOrderComponent,
  ],
  entryComponents: [DialogPreOrderComponent],
  providers: [],
})
export class SharedModule {}
