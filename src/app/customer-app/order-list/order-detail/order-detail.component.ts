import { Component, OnInit } from '@angular/core';
import { CustomerStateService } from '../../customer-state.service';
import { CustomerService } from '../../customer.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ZATAAKSE_JWT_TOKEN, ECustomerServiceType } from '../../../shared/constants/constants'


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  data: any;

  constructor(
    private customerStateservice: CustomerStateService,
    private location: Location,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    if(!this.customerStateservice.getOrderId()) {
      this.router.navigate(['/customer/order-history']);
    }
    this.customerService.getTransactionHistory(localStorage.getItem(ZATAAKSE_JWT_TOKEN), "1", this.customerStateservice.getOrderId()).subscribe((data: any) => {
      this.data = data.data.data[0];
      console.log(this.data);
    });
  }

  onBackClick() {
    if (this.customerStateservice.currentServiceSelected === ECustomerServiceType.Essential) {
      this.router.navigate(['customer']);
    } else{
      this.location.back();
    }

  }

  goToFile() {
    window.open(this.data.file);
  }

}
