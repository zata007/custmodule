import { Component, OnInit } from '@angular/core';
import { CustomerStateService } from '../customer-state.service';
import { IMenuData, IResponseGetSkuData, IRequestGetSkuData,
   IRequestGetRestaurantData, IResponseGetRestaurantData } from 'src/app/shared/models/common-model';
import { DataService } from 'src/app/shared/services/data.service';
import { EListPageViewType, ECustomerServiceType } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pitstop-landing',
  templateUrl: './pitstop-landing.component.html',
  styleUrls: ['./pitstop-landing.component.scss']
})
export class PitstopLandingComponent implements OnInit {
  foods: IMenuData[];
  resName: string;

  constructor(private customerStateService: CustomerStateService, private dataService: DataService, private commonService: CommonService) {
    // this.customerStateService.currentSkuData$.subscribe(data => {
    //   console.log(data);
    //   this.foods = data.skuData;
    //   this.resName = data.resName;
    // });
   }

  ngOnInit() {
    this.customerStateService.setCurrentPage('pitstop-view');
    this.getFoodList().subscribe(res => {
      this.foods = res.data.skuData;
    });
  }

  getRestaurants(): Observable<IResponseGetRestaurantData>{
    const pitstopData = this.customerStateService.getCurrentPitstopData();
    const data: IRequestGetRestaurantData = {
      ...this.commonService.getRequestEssentialParams(),
      pitstopLatitude: pitstopData.lat,
      pitstopLongitude: pitstopData.lng,
      isTakeAway: true,
      isDelivery: false,
      isOrderAhead: false,
    };
    return this.dataService.getRestauratData(data) as any;
  }

  getFoodList(): Observable<IResponseGetSkuData> {
    const pitstopData = this.customerStateService.getCurrentPitstopData();
    const data: IRequestGetSkuData = {
      flag: 1,
      pageNum: 1,
      ...this.commonService.getRequestEssentialParams(),
      pitstopLongitude: pitstopData.lng.toString(),
      pitstopLatitude: pitstopData.lat.toString()
    };
    return this.dataService.getSku(data) as any;
  }

}
