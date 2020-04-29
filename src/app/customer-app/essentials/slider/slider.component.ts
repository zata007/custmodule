import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
    zoom: {
      maxRatio: 5,
      minRatio: 2
    },
  }

  constructor(
    public dialogRef: MatDialogRef<SliderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  ngOnInit() {
  }

}
