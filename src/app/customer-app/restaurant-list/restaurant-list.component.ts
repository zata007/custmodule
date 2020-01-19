import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';
import { IRestaurantData, IPaginationResGetRestaurant } from 'src/app/shared/models/common-model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurantLists: IRestaurantData[];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<RestaurantListComponent>,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IPaginationResGetRestaurant
  ) {
    this.restaurantLists = data.blData;
  }

  ngOnInit() {}

  onRestaurantClick(item: IRestaurantData) {
    // TODO: Goto page.
    console.log(item);
    this.bottomSheetRef.dismiss();

  }
}
