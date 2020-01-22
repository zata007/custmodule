import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { OrderService } from '../order.service';
import { IMenuData } from 'src/app/shared/models/common-model';
import { ZATAAKSE_JWT_TOKEN } from 'src/app/shared/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartViewComponent implements OnInit {

  orderedItems: IMenuData[] = [];
  hasAuthToken = false;
  constructor(private location: Location, private bottomSheet: MatBottomSheet, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orderedItems = this.orderService.getCartData();
    this.hasAuthToken = !!localStorage.getItem(ZATAAKSE_JWT_TOKEN);
  }
  onBackClick() {
    this.location.back();
  }

  openDetailedBill() {
    this.bottomSheet.open(BillDetailComponent, {
      data: {  }
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
      console.log('order can be placed');

    } else {
      // Goto login-signup
      this.router.navigate(['login-signup']);
    }
  }



}
