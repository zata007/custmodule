import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';
import { IRestaurantData, IPaginationResGetRestaurant, IRequestGetSkuData } from 'src/app/shared/models/common-model';
import { CustomerServiceType } from 'src/app/shared/constants/constants';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurantLists: IRestaurantData[];
  openedFrom = '';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<RestaurantListComponent>,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService,
    private commonService: CommonService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {data: IPaginationResGetRestaurant, openedFrom: string}
  ) {
    this.restaurantLists = data.data.blData;
    this.openedFrom = data.openedFrom;
  }

  ngOnInit() {}

  onRestaurantClick(item: IRestaurantData) {
    // TODO: Goto page.
    console.log(item, this.openedFrom);
    const data: IRequestGetSkuData = {
      businessLocId: item.businessLocId,
      pitstopLatitude: '' + item.longLat[1],
      pitstopLongitude: '' + item.longLat[0],
      flag: 1,
      pageNum: 1,
      ...this.commonService.getRequestEssentialParams()
    };
    switch (this.openedFrom) {
      case CustomerServiceType.TakeAway:
       // delete data.businessLocId;
        break;
      case CustomerServiceType.OrderAhead:
      case CustomerServiceType.Delivery:
        // delete data.pitstopLatitude;
        // delete data.pitstopLongitude;
        break;
      default:
        break;
    }

    console.log(data);
    this.dataService.getSku(data).subscribe(res => {
      console.log(res);
      this.bottomSheetRef.dismiss();
    });

  }
}
