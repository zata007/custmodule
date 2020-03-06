import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ZATAAKSE_JWT_TOKEN, ZATAAKSE_PROFILE_DATA } from '../../shared/constants/constants';
import { IResponseGetProfileData, IProfileData, IAddressData, IVehicleData } from 'src/app/shared/models/common-model';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { BottomVehicleComponent } from '../vehicle/bottom-vehicle/bottom-vehicle.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: IProfileData;
  basic: any = [];
  address: IAddressData[];
  vehicle: IVehicleData[];
  mobile: string;
  email: String;
  notification: boolean;

  constructor(
    private location: Location,
    public router: Router,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    // Fetching profile details
    if (localStorage.getItem(ZATAAKSE_JWT_TOKEN)) {
      this.customerService.getProfile(localStorage.getItem(ZATAAKSE_JWT_TOKEN)).subscribe((data: IResponseGetProfileData) => {
        // Store profile data
        localStorage.setItem(ZATAAKSE_PROFILE_DATA, JSON.stringify(data.data));
        this.data =  data.data;
        this.basic =  data.data.indDetail.basic;
        this.mobile = data.data.indDetail.indMobileNum;
        this.email = data.data.indDetail.roles[0].indEmail;
        this.address =  data.data.indDetail.roles[0].indAddr;
        this.vehicle = data.data.indDetail.roles[0].indVehicles;
        this.notification = data.data.indDetail.roles[0].deviceId.indPushNotify;
        console.log(this.data)
      }, (err) => {
        // TODO: Handle error for invalid/expired token
        localStorage.removeItem(ZATAAKSE_JWT_TOKEN);
        localStorage.removeItem(ZATAAKSE_PROFILE_DATA);
        this.router.navigate(['login-signup']);

      });
    } else {
      this.router.navigate(['login-signup']);
    }
  }

  onBackClick() {
    this.location.back();
  }

  addNewAddress() {
    this.router.navigate(['customer/address/add']);
  }

  addNewVehicle(): void {
    const bottomVehicleRef = this.bottomSheet.open(BottomVehicleComponent);
    bottomVehicleRef.afterDismissed().subscribe((res: IVehicleData[]) => {
      if (res) {
        this.vehicle = res;
      }
    });
  }

  onNavigate() { this.router.navigate(['customer/profile/edit']); }

}
