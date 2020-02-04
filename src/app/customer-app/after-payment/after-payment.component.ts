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
  timer : any;
  pitstop: any;

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
    var countdown = 30 * 60 * 1000;
    this.timer = setInterval(function(){
      countdown -= 1000;
      var min = Math.floor(countdown / (60 * 1000));
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);

      if (countdown <= 0) {
        return "0:00";
      } else {
        return min+':'+sec;
      }

    }, 1000);

    this.pitstop = [localStorage.getItem('pitstop'), localStorage.getItem('landmark')];
    //console.log(this.customerStateService.getCurrentPitstopData());
  }

  mapReady() {
    console.log('map-ready');

  }

}
