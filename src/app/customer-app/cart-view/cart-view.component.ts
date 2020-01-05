import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { OrderService } from '../order.service';
import { OrderedItem } from '../customer.model';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartViewComponent implements OnInit {

  orderedItems: OrderedItem[] = [];
  constructor(private location: Location, private bottomSheet: MatBottomSheet, private orderService: OrderService) { }

  ngOnInit() {
    this.orderedItems = this.orderService.getCartData();
  }
  onBackClick() {
    this.location.back();
  }

  openDetailedBill() {
    this.bottomSheet.open(BillDetailComponent, {
      data: {  }
    });
  }

  onAddUnit(data: OrderedItem) {
    this.orderService.addToCart(data);
  }

  onRemoveUnit(data: OrderedItem) {
    this.orderService.removeFromCart(data);
  }

  removeItemFromCart(data: OrderedItem) {
    this.orderService.removeItem(data);
  }



}
