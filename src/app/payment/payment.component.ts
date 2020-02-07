import { Component, OnInit } from '@angular/core';
import { ZATAAKSE_PAYMENT_TOKEN } from '../shared/constants/constants';
import { DataService } from '../shared/services/data.service';
import { IResponsePlaceOrder } from '../shared/models/common-model';
import { Router } from '@angular/router';

const PAYMENT_STATUS = {
  PENDING : 'Pending',
  COMPLETED : 'Completed',
  ERROR : 'Error',
  HOLD : 'Hold',
  FAILED: 'Failed',
  INVALID: 'Invalid',
  ABANDONED: 'Abandoned'
};


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentStatus = null;
  selectedService = null;

  PAYMENT_STATUS = PAYMENT_STATUS;

  PAYMENT_MSG_MAP = {
    [PAYMENT_STATUS.PENDING]: 'Payment is Pending',
    [PAYMENT_STATUS.COMPLETED]: 'Payment has been completed',
    [PAYMENT_STATUS.ERROR]: 'Something went wrong ',
    [PAYMENT_STATUS.HOLD]: 'Payment is on hold',
    [PAYMENT_STATUS.FAILED]: 'Payment has been failed',
    [PAYMENT_STATUS.INVALID]: 'Payment is Invalid',
    [PAYMENT_STATUS.ABANDONED]: 'Payment is Abandoned',
  };

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.paymentStatus$.subscribe((res) => {
      if (res) {
        this.paymentStatus = res.paymentStatus;
        console.log(res);
      }
    });
   }

  ngOnInit() {
    const paymentItem: IResponsePlaceOrder = JSON.parse(localStorage.getItem(ZATAAKSE_PAYMENT_TOKEN));
    console.log('Navigated after payment', paymentItem);
    const msg = paymentItem.data.msg.split('|');
    this.dataService.getOrderStatus(msg[1]);
  }

  onSubmit() {
    switch (this.paymentStatus) {
      case PAYMENT_STATUS.COMPLETED:
        this.router.navigate([`customer/order-placed/`]);
        break;

      default:
        this.router.navigate([`customer`]);
        //this.router.navigate([`customer`]);
        break;
    }

  }

}
