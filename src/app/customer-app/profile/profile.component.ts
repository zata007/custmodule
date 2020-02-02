import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any = [];

  constructor(
    private location: Location,
    public router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    //Fetching profile details
    if(typeof localStorage.getItem('zataakse_jwt_token') !== "undefined" && localStorage.getItem('zataakse_jwt_token') !== null) {
      // this.data = this.customerService.getProfile(localStorage.getItem('zataakse_jwt_token'));
    } else {
      this.router.navigate(['login-signup']);
    }
    console.log(this.customerService.getProfile(localStorage.getItem('zataakse_jwt_token')));
    console.log(localStorage.getItem('zataakse_jwt_token'));
  }

  onBackClick() {
    this.location.back();
  }

}
