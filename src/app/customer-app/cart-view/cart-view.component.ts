import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { OrderService } from '../order.service';
import { IMenuData, IRequestPlaceOrder, IOrderData, IRestaurantData, IProfileData, IAddressData, IVehicleData } from 'src/app/shared/models/common-model';
import { ZATAAKSE_JWT_TOKEN, ZATAAKSE_PAYMENT_TOKEN, ZATAAKSE_SELECTED_SERVICE, ECustomerServiceType, ZATAAKSE_PROFILE_DATA } from 'src/app/shared/constants/constants';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CustomerStateService } from '../customer-state.service';
import { AddressListComponent } from './address-list/address-list.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartViewComponent implements OnInit {

  ECustomerServiceType = ECustomerServiceType;
  orderedItems: IMenuData[] = [];
  profileData: IProfileData = null;
  addressData: IAddressData[] = null;
  vehicleData: IVehicleData[] = null;
  hasAuthToken = false;
  deliveryLocation = '';
  pitstopData = {
    locality: '',
    name: ''
  };
  currentRestaurantData: IRestaurantData = null;
  selectedTime: string;
  selectedLocationForDelivery: IAddressData;
  selectedVehicle: IVehicleData;
  totalPrice: number = 0;
  totalItem: number = 0;
  orderAheadtime: number;
  form: FormGroup;
  time: any;
  orderData: IOrderData[] = []

  constructor(
    private location: Location,
    private dataService: DataService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private orderService: OrderService,
    private router: Router,
    private commonService: CommonService,
    public customerStateService: CustomerStateService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup ({
      time: new FormControl()
    })
    this.orderedItems = this.orderService.getCartData();
    console.log(this.orderedItems);

    const position = this.customerStateService.getFromLocation();
    const data = {
      orderData: this.orderService.cart.map(i => {
      return  {
        businessLocId: i.apPsBusinessLocId,
        skuId: i._id,
        qty: i.skuServes
      };
    }) as any};
    const fingerprint = this.commonService.fingerPrint;
    console.log(data);

    // this.dataService.addCart(fingerprint, data, position).subscribe((data: any) => {
    //   console.log(data);
    // })

    this.totalPrice = this.orderService.getTotal();
    this.orderService.orderCount$.subscribe(res => {
      this.totalItem = res;
    });
    this.hasAuthToken = !!localStorage.getItem(ZATAAKSE_JWT_TOKEN);

    switch (this.customerStateService.currentServiceSelected) {
      case ECustomerServiceType.TakeAway:
        if (this.customerStateService.currentPitstopData) {
          this.pitstopData = {
            locality: this.customerStateService.currentPitstopData.landmark,
            name: this.customerStateService.currentPitstopData.pitstop
          };
        }
        this.profileData =  localStorage.getItem(ZATAAKSE_PROFILE_DATA) ? JSON.parse(localStorage.getItem(ZATAAKSE_PROFILE_DATA)) : null;
        if (this.profileData) {
          this.vehicleData = this.profileData.indDetail.roles[0] && this.profileData.indDetail.roles[0].indVehicles;
          this.selectedVehicle = this.vehicleData[0];
        }
        break;
      case ECustomerServiceType.Delivery:
        if (this.customerStateService.currentDeliveryLocation) {
          this.profileData =  localStorage.getItem(ZATAAKSE_PROFILE_DATA) ? JSON.parse(localStorage.getItem(ZATAAKSE_PROFILE_DATA)) : null;
          if (this.profileData) {
          this.addressData = this.profileData.indDetail.roles[0] && this.profileData.indDetail.roles[0].indAddr;
          this.selectedLocationForDelivery = this.addressData[0];

         }
          this.deliveryLocation = this.customerStateService.currentDeliveryLocation;
        }
        break;
      default:
        this.currentRestaurantData = this.customerStateService.currentRestaurantData;
        break;
    }
  }

  onBackClick() {
    this.customerStateService.setCurrentPage('main');
    this.location.back();
  }

  openDetailedBill() {
    this.bottomSheet.open(BillDetailComponent, {
      data: {}
    });
  }

  onAddUnit(data: IMenuData) {
    this.orderService.addToCart(data);
  }

  onRemoveUnit(data: IMenuData) {
    this.orderService.removeFromCart(data);
  }

  removeItemFromCart(data: IMenuData) {
    this.orderService.removeItem(data);
  }

  onSubmitClick() {
    if (this.hasAuthToken) {
      // TODO place order.
      const data: IRequestPlaceOrder = {

        orderData: this.orderService.cart.map(i => {
          return  {
            businessLocId: i.apPsBusinessLocId,
            skuId: i._id,
            qty: i.skuServes
          };
        }) as any,
        orderType: this.customerStateService.currentServiceSelected,
        totalPrice: this.totalPrice + 20
      }

      switch (this.customerStateService.currentServiceSelected) {
        case ECustomerServiceType.TakeAway:
          data.pitstopId = this.customerStateService.getCurrentPitstopData().id;
          data.vehicleId = this.selectedVehicle['_id'];
          break;
        case ECustomerServiceType.Delivery:
          data.addressId = this.selectedLocationForDelivery['_id'];
          break;
        case ECustomerServiceType.OrderAhead:
          this.time = this.form.value['time'].split(":");
          this.orderAheadtime = Number(this.time[0])*60 + Number(this.time[1]);
          data.time = this.orderAheadtime;
          break;
      }

      this.dataService.placeOrder(data).subscribe(res => {
        this.commonService.paymentInformation = res;
        const localStorageData = {};
        switch (this.customerStateService.currentServiceSelected) {
          case ECustomerServiceType.TakeAway:
            // tslint:disable-next-line: no-string-literal
            localStorageData['data'] = {
              locationData: this.customerStateService.selectedLocation,
              pitstopData: this.customerStateService.getCurrentPitstopData()
            };
            break;
          case ECustomerServiceType.Delivery:
            // tslint:disable-next-line: no-string-literal
            localStorageData['data'] = {
              locationData: this.customerStateService.selectedLocation,
              address:`${this.selectedLocationForDelivery.addrLine1 + + this.selectedLocationForDelivery.addrLine2 + + this.selectedLocationForDelivery.locality}`, // TODO: pass customer's address
            };
            break;
            case ECustomerServiceType.OrderAhead:
              // tslint:disable-next-line: no-string-literal
              localStorageData['data'] = {
                name: this.orderedItems[0].skuCuisine,
                time: this.orderAheadtime
              };
              break;

          default:
            break;
        }
        // tslint:disable-next-line: no-string-literal
        localStorageData['serviceType'] = this.customerStateService.currentServiceSelected;
        localStorage.setItem(ZATAAKSE_SELECTED_SERVICE, JSON.stringify(localStorageData));
        localStorage.setItem(ZATAAKSE_PAYMENT_TOKEN, JSON.stringify(res));
        // window.location.replace( `${res.data.billdeskUrl}?msg=${res.data.msg}`);
        window.open(`${res.data.billdeskUrl}?msg=${res.data.msg}`, '_self');
      }, (errorPlaceOrder) => {
        console.log(errorPlaceOrder)

      });

    } else {
      // Goto login-signup
      this.router.navigate(['login-signup']);
    }
  }

  private getPlaceName(lat, lng, callback: Function) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    const request = { location: latlng };
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0];
        const rsltAdrComponent = result.address_components;
        const resultLength = rsltAdrComponent.length;
        if (result != null) {
          callback(result);
          // this.address = rsltAdrComponent[resultLength - 8].short_name;
        } else {
          callback(result);
          alert('No address available!');
        }
      }
    });
  }

  onAddressChange(): void {
    const addressListRef = this.bottomSheet.open(AddressListComponent, {
      data: this.addressData
    });

    addressListRef.afterDismissed().subscribe((data: IAddressData)  => {
      if (data) {
        this.selectedLocationForDelivery = data;
      }
    });
  }

  onVehicleChange(): void {
    const vehicleListRef = this.bottomSheet.open(VehicleListComponent, {
      data: this.vehicleData
    });
    vehicleListRef.afterDismissed().subscribe((res: IVehicleData) => {
      if (res) {
        this.selectedVehicle = res;
      }
    });
  }

  addVehicle() {
    const bottomVehicleRef = this.bottomSheet.open(BottomVehicleComponent);
    bottomVehicleRef.afterDismissed().subscribe((res: IVehicleData[]) => {
      if (res) {
        this.vehicleData = res;
      }
    });
  }
  onAddAddressClick() {
    this.router.navigate(['customer/address/add']);
  }
}
