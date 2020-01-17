import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataService } from 'src/app/shared/services/data.service';
import { IResponsePlatformParams } from 'src/app/shared/models/common-model';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.commonService.setUserLocation(latitude, longitude);
          // Get Platform params
          // TODO: GET /params/getPlatformParams
          this.dataService
            .getPlatformParams({
              ...this.commonService.getRequestEssentialParams()
            })
            .subscribe((res: IResponsePlatformParams) => {
              // TODO: Save Params
              this.commonService.setPlatformParams(res.data);
              console.log(res);
            });
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
