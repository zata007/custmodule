import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  MatBottomSheetRef,
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';
import { IRestaurantData, IPaginationResGetRestaurant, IRequestGetSkuData, IResponseGetSkuData } from 'src/app/shared/models/common-model';
import { ECustomerServiceType, EListPageViewType } from 'src/app/shared/constants/constants';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { CustomerStateService } from '../customer-state.service';

@Component({
  selector: 'restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  @Input() restaurantLists: IRestaurantData[];
  openedFrom = '';
  constructor(
    private dataService: DataService,
    private commonService: CommonService,
    private customerStateService: CustomerStateService,
    private router: Router,
    ) { }

  ngOnInit() {}

  onRestaurantClick(item: IRestaurantData) {
    // TODO: Goto page.
    console.log(item, this.openedFrom);
  }
}
