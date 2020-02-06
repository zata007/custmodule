import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { OrderService } from '../order.service';
import { IMenuData, IRequestPlaceOrder, IRestaurantData, IProfileData, IAddressData, IVehicleData } from 'src/app/shared/models/common-model';
import { ZATAAKSE_JWT_TOKEN, ZATAAKSE_PAYMENT_TOKEN, ZATAAKSE_SELECTED_SERVICE, ECustomerServiceType, ZATAAKSE_PROFILE_DATA } from 'src/app/shared/constants/constants';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CustomerStateService } from '../customer-state.service';
import { AddressListComponent } from './address-list/address-list.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component';

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
  addressData: IAddressData = null;
  vehicleData: IVehicleData = null;
  hasAuthToken = false;
  deliveryLocation = '';
  pitstopData = {
    locality: '',
    name: ''
  };
  currentRestaurantData: IRestaurantData = null;
  selectedTime: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private orderService: OrderService,
    private router: Router,
    private commonService: CommonService,
    public customerStateService: CustomerStateService,
    // private atp: AmazingTimePickerService
  ) {}

  ngOnInit() {
    this.orderedItems = this.orderService.getCartData();
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
        this.vehicleData = this.profileData.indDetail.roles[0].indVehicles;
        console.log(this.vehicleData)
        break;
      case ECustomerServiceType.Delivery:
        if (this.customerStateService.currentDeliveryLocation) {
          this.profileData =  localStorage.getItem(ZATAAKSE_PROFILE_DATA) ? JSON.parse(localStorage.getItem(ZATAAKSE_PROFILE_DATA)) : null;
          this.addressData = this.profileData.indDetail.roles[0].indAddr;
          console.log(this.addressData)
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
            businessLocId: "5e356afe2000b41e6ba0a397", //i.apPsBusinessLocId,
            skuId: "5e36d6ced2321da3b48fcb41", //i._id,
            qty: 1 //i.skuServes
          };
        }) as any,
        orderType: this.customerStateService.currentServiceSelected,
        totalPrice: 150,
        addressId: "5e394b0ba8b8c854b6529d37",
        pitstopId: "5e3694f1d2321da3b45e361b" // this.customerStateService.getCurrentPitstopData().id

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
              address: 'Ishan Appartments, NewLand road, Bangladesh.', // TODO: pass customer's address
            };
            break;

          default:
            break;
        }
        // tslint:disable-next-line: no-string-literal
        localStorageData['serviceType'] = this.customerStateService.currentServiceSelected;
        localStorage.setItem(ZATAAKSE_SELECTED_SERVICE, JSON.stringify(localStorageData));
        localStorage.setItem(ZATAAKSE_PAYMENT_TOKEN, JSON.stringify(res));
        window.location.replace( `${res.data.billdeskUrl}?msg=${res.data.msg}`);

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
    this.bottomSheet.open(AddressListComponent, {
      data: this.addressData
    })
  }

  onVehicleChange(): void {
    this.bottomSheet.open(VehicleListComponent, {
      data: this.vehicleData
    })
  }

  addVehicle() {
    this.bottomSheet.open(BottomVehicleComponent)
  }

//   openTime() {
//     const amazingTimePicker = this.atp.open();
//     amazingTimePicker.afterClose().subscribe(time => {
//         this.selectedTime = time;
//     });
// }

}
