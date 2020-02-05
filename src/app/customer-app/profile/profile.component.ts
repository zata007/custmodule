import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ZATAAKSE_JWT_TOKEN } from '../../shared/constants/constants'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any = [];
  basic: any = [];
  address: any = [];

  constructor(
    private location: Location,
    public router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    //Fetching profile details
    if(typeof localStorage.getItem(ZATAAKSE_JWT_TOKEN) !== "undefined" && localStorage.getItem(ZATAAKSE_JWT_TOKEN) !== null) {
      this.customerService.getProfile(localStorage.getItem(ZATAAKSE_JWT_TOKEN)).subscribe((data: any) => {
        const profile: Array<any> = data.data;
        this.data = profile;
        this.basic = this.data.indDetail.basic;
        this.address = this.data.indDetail.roles[0].indAddr;
        console.log(this.address);
        console.log(this.data);
        console.log(this.basic.indFirstName);
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

}
