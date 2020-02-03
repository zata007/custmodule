import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { CustomerStateService } from '../customer-state.service';
import { CustomerService } from '../customer.service';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { MAP_STYLES } from '../map-vehicle/map-consts';
import { DialogPreOrderComponent } from 'src/app/shared/shared-components/dialog-pre-order/dialog-pre-order.component';
import { NotServicebleComponent } from 'src/app/shared/shared-components/not-serviceble/not-serviceble.component';
import { DataService } from '../../shared/services/data.service';
import { ZATAAKSE_PREF_LANG, ECustomerServiceType } from '../../shared/constants/constants';

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.component.html',
  styleUrls: ['./after-payment.component.scss']
})
export class AfterPaymentComponent implements OnInit {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private commonService: CommonService,
    public customerStateService: CustomerStateService,
    private customerService: CustomerService,
    private geoLocationService: GeoLocationService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

}
