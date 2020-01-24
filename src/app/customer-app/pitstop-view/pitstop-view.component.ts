import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from '../order.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomAddressComponent } from '../address/bottom-address/bottom-address.component';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component'
import { EListPageViewType } from 'src/app/shared/constants/constants';
import { CustomerStateService } from '../customer-state.service';
import { IMenuData, IResponseGetSkuData, IRequestGetSkuData,
  IRequestGetRestaurantData, IResponseGetRestaurantData, IRestaurantData } from 'src/app/shared/models/common-model';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-pitstop-view',
  templateUrl: './pitstop-view.component.html',
  styleUrls: ['./pitstop-view.component.scss'],
})
export class PitstopViewComponent implements OnInit {
  isOrdered = false;
  canShowPitstopLanding = false;
  selectedFrom = '';
  selectedTo = '';
  resName = '';
  path = sessionStorage.getItem('path');
  foods: IMenuData[];
  filteredFoods: IMenuData[];
  restaurants: IRestaurantData[];
  filteredRestaurants: IRestaurantData[];
  searchTerms = '';
  selectedTab = 0;

  constructor(
    private customerStateService: CustomerStateService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private orderService: OrderService,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService
  ) {
    // this.customerStateService.currentSkuData$.subscribe(data => {
    //   console.log(data);
    //   this.foods = data.skuData;
    //   this.resName = data.resName;
    // });
  }

  ngOnInit() {
    const openType =  this.route.snapshot.params.openType;
    if (openType) {
      switch (openType) {
        case EListPageViewType.FoodList:
          this.canShowPitstopLanding = true;
          break;
        default:
          this.canShowPitstopLanding = false;
          break;
      }
    }
   // this.foods = this.orderService.getFoodListByRestaurant(+1);

    // TODO Refactor
    // if (this.customerService.selectedPlaces.from && this.customerService.selectedPlaces.to) {
    //   this.selectedFrom = this.customerService.selectedPlaces.from.formatted_address;
    //   this.selectedTo = this.customerService.selectedPlaces.to.formatted_address;
    // } else {
    //   this.router.navigate(['/customer']);
    // }

    this.customerStateService.setCurrentPage('pitstop-view');

    this.getFoodList().subscribe(res => {
      this.foods = res.data.skuData;
      this.filteredFoods = this.foods;
    });

    this.getRestaurants().subscribe(res => {
      this.restaurants = res.data.blData;
      this.filteredRestaurants = this.restaurants;
    });
  }

  onSearchKeyUp(searchTerm: string) {
    if (searchTerm.length > 2) {
      // TODO: Find selected tab and filter data
      if (this.selectedTab === 0) {
        this.filteredFoods = this.foods.filter(i => i.dishName.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        this.filteredRestaurants = this.restaurants.filter(i => i.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.filteredFoods = this.foods;
    this.filteredRestaurants = this.restaurants;
  }

  onTabChange() {
    this.onSearchKeyUp(this.searchTerms);
  }

  getRestaurants(): Observable<IResponseGetRestaurantData>{
    const pitstopData = this.customerStateService.getCurrentPitstopData();
    if(this.path === 'customer/order-delivery') {
      const data: IRequestGetRestaurantData = {
        ...this.commonService.getRequestEssentialParams(),
        pitstopLatitude: pitstopData.lat,
        pitstopLongitude: pitstopData.lng,
        isTakeAway: false,
        isDelivery: true,
        isOrderAhead: false,
      };
      return this.dataService.getRestauratData(data) as any;
    } else if(this.path === 'customer/order-ahead') {
      const data: IRequestGetRestaurantData = {
        ...this.commonService.getRequestEssentialParams(),
        pitstopLatitude: pitstopData.lat,
        pitstopLongitude: pitstopData.lng,
        isTakeAway: false,
        isDelivery: false,
        isOrderAhead: true,
      };      
    return this.dataService.getRestauratData(data) as any;
    }
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

  placeOrder() {
    if (this.path === 'customer/order-delivery') {
      this.bottomSheet.open(BottomAddressComponent);
    } else if (!this.path || this.path === 'customer/order-takeaway') {
      this.bottomSheet.open(BottomVehicleComponent);
    }
  }

  getTotal() {
    return this.orderService.getTotal();
  }
}
