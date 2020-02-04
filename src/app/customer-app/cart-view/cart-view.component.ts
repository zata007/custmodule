import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { OrderService } from '../order.service';
import { IMenuData, IRequestPlaceOrder } from 'src/app/shared/models/common-model';
import { ZATAAKSE_JWT_TOKEN, ZATAAKSE_PAYMENT_TOKEN } from 'src/app/shared/constants/constants';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CustomerStateService } from '../customer-state.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartViewComponent implements OnInit {

  orderedItems: IMenuData[] = [];
  hasAuthToken = false;
  constructor(
    private location: Location,
    private dataService: DataService,
    private bottomSheet: MatBottomSheet,
    private orderService: OrderService,
    private router: Router,
    private commonService: CommonService,
    private customerStateService: CustomerStateService
  ){}

  ngOnInit() {
    this.orderedItems = this.orderService.getCartData();
    this.hasAuthToken = !!localStorage.getItem(ZATAAKSE_JWT_TOKEN);
  }
  onBackClick() {
    this.customerStateService.setCurrentPage('main');
    this.location.back();
  }

  openDetailedBill() {
    this.bottomSheet.open(BillDetailComponent, {
      data: {}
    });
  }

  onAddUnit(data: IMenuData) {
    this.orderService.addToCart(data);
  }

  onRemoveUnit(data: IMenuData) {
    this.orderService.removeFromCart(data);
  }

  removeItemFromCart(data: IMenuData) {
    this.orderService.removeItem(data);
  }

  onSubmitClick() {
    if (this.hasAuthToken) {
      // TODO place order.
      const data: IRequestPlaceOrder = {

        orderData: this.orderService.cart.map(i => {
          return  {
            businessLocId: i.apPsBusinessLocId,
            skuId: i._id,
            qty: i.skuServes
          };
        }) as any,
        orderType: this.customerStateService.currentServiceSelected,
        totalPrice: 10,
        pitstopId: this.customerStateService.getCurrentPitstopData().id

      }
      this.dataService.placeOrder(data).subscribe(res => {
        this.commonService.paymentInformation = res;

        localStorage.setItem(ZATAAKSE_PAYMENT_TOKEN, JSON.stringify(res));
        window.location.replace( `${res.data.billdeskUrl}?msg=${res.data.msg}`);
        console.log(this.customerStateService.currentServiceSelected);
      });

    } else {
      // Goto login-signup
      this.router.navigate(['login-signup']);
    }
  }



}
