import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {

  constructor(private commonService: CommonService, private dataService: DataService) { }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.commonService.setUserLocation(latitude, longitude);
          // Get Platform params
          // TODO: GET /params/getPlatformParams
         // this.dataService.get

        },
        error => {
          // User blocked location
          // LocationPopupComponent
          console.log(error);
        }
      );
    }
  }

}
