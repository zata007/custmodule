import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from '../order.service';
import { OrderedItem } from '../customer.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomAddressComponent } from '../address/bottom-address/bottom-address.component';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component'

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
  path = sessionStorage.getItem('path');

  foods = [];
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private orderService: OrderService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    // const resId =  this.route.snapshot.params.id;
    this.foods = this.orderService.getFoodListByRestaurant(+1);
    if (this.customerService.selectedPlaces.from && this.customerService.selectedPlaces.to) {
      this.selectedFrom = this.customerService.selectedPlaces.from.formatted_address;
      this.selectedTo = this.customerService.selectedPlaces.to.formatted_address;
    } else {
      this.router.navigate(['/customer']);
    }
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
