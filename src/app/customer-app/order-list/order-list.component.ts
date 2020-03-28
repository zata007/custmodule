import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router'
import { CustomerService } from '../customer.service';
import { CustomerStateService } from '../customer-state.service';
import { ZATAAKSE_JWT_TOKEN } from '../../shared/constants/constants'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  listItems: any;

  constructor(
    private customerService: CustomerService,
    private location: Location,
    public customerStateService: CustomerStateService,
    private router: Router,
  ){}

  ngOnInit() {
    this.customerService.getTransactionHistory(localStorage.getItem(ZATAAKSE_JWT_TOKEN), "1").subscribe((data: any) => {
      this.listItems = data.data.data;
      console.log(this.listItems);
    });
  }

  onBackClick() {
    this.customerStateService.setCurrentPage('main');
    this.location.back();
  }

  goOrderDetail(id) {
    this.customerStateService.setOrderId(id);
    this.router.navigate(['/customer/order-detail'])
  }

}
