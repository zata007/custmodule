import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material';
import { PreRegisterComponent } from '../pre-register/pre-register.component';

@Component({
  selector: 'app-not-serviceble',
  templateUrl: './not-serviceble.component.html',
  styleUrls: ['./not-serviceble.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotServicebleComponent implements OnInit {
  isSubmitRequestVisible = false;
  location = '';
  mailText = '';
  restaurantData = {
    name: '',
    contact: '',
    address: ''
  };
  constructor(
    private bottomSheetRef: MatBottomSheetRef<NotServicebleComponent>,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.location = data.location;
  }

  ngOnInit() {}

  requestService() {
    this.isSubmitRequestVisible = !this.isSubmitRequestVisible;
  }

  closePage() {
    this.bottomSheetRef.dismiss();
  }

  proceed(){
    this.isSubmitRequestVisible = true;
  }

  mailMe() {
    this.mailText = `mailto:partners@zataakse.com?subject=Restaurant-Request&body=name:${this.restaurantData.name}<br> contact:${this.restaurantData.contact}<br> address:${this.restaurantData.address}`;
    window.location.href = this.mailText;
    this.closePage();
    this.bottomSheet.open(PreRegisterComponent, {});
  }
}
