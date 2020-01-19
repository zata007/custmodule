import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from '../order.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomAddressComponent } from '../address/bottom-address/bottom-address.component';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component'
import { EListPageViewType } from 'src/app/shared/constants/constants';
import { CustomerStateService } from '../customer-state.service';
import { IMenuData } from 'src/app/shared/models/common-model';

@Component({
  selector: 'app-pitstop-view',
  templateUrl: './pitstop-view.component.html',
  styleUrls: ['./pitstop-view.component.scss'],
})
export class PitstopViewComponent implements OnInit {
  isOrdered = false;
  canShowPitstopLanding = false;
  selectedFrom = '';
  selectedTo = '';
  resName = '';
  path = sessionStorage.getItem('path');

  foods: IMenuData[]  = [];
  constructor(
    private customerStateService: CustomerStateService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private orderService: OrderService,
    private bottomSheet: MatBottomSheet
  ) {
    this.customerStateService.currentSkuData$.subscribe(data => {
      console.log(data);
      this.foods = data.skuData;
      this.resName = data.resName;
    });
  }

  ngOnInit() {
    const openType =  this.route.snapshot.params.openType;
    if (openType) {
      switch (openType) {
        case EListPageViewType.FoodList:
          this.canShowPitstopLanding = true;
          break;
        default:
          this.canShowPitstopLanding = false;
          break;
      }
    }
   // this.foods = this.orderService.getFoodListByRestaurant(+1);

    // TODO Refactor
    // if (this.customerService.selectedPlaces.from && this.customerService.selectedPlaces.to) {
    //   this.selectedFrom = this.customerService.selectedPlaces.from.formatted_address;
    //   this.selectedTo = this.customerService.selectedPlaces.to.formatted_address;
    // } else {
    //   this.router.navigate(['/customer']);
    // }
  }

  placeOrder() {
    if (this.path === 'customer/order-delivery') {
      this.bottomSheet.open(BottomAddressComponent);
    } else if (!this.path || this.path === 'customer/order-takeaway') {
      this.bottomSheet.open(BottomVehicleComponent);
    }
  }

  getTotal() {
    return this.orderService.getTotal();
  }
}
