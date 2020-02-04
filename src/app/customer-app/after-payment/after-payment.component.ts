import { Component, OnInit } from '@angular/core';
import { CustomerStateService } from '../customer-state.service';
import { MatDialog } from '@angular/material';
import { ECustomerServiceType } from '../../shared/constants/constants';
import { MAP_STYLES } from '../map-vehicle/map-consts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.component.html',
  styleUrls: ['./after-payment.component.scss']
})
export class AfterPaymentComponent implements OnInit {
  ECustomerServiceType = ECustomerServiceType;
  selectedService = ECustomerServiceType.Delivery;
  mapStyles = MAP_STYLES;

  mapForHeader = {
    [ECustomerServiceType.Delivery] : 'Delivery',
    [ECustomerServiceType.OrderAhead] : 'OrderAhead',
    [ECustomerServiceType.TakeAway] : 'TakeAway',

  };

  constructor(
    public customerStateService: CustomerStateService,
    public dialog: MatDialog,
    private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.selectedService = this.route.snapshot.params.orderType;
  }

  mapReady() {
    console.log('map-ready');

  }

}
