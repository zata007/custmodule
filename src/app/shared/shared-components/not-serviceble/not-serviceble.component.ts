import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatSnackBar } from '@angular/material';
import { PreRegisterComponent } from '../pre-register/pre-register.component';
import { DataService } from '../../services/data.service';
import { CommonService } from '../../services/common.service';

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
  name = '';
  restaurantData = {
    name: '',
    contact: '',
    address: ''
  };
  constructor(
    private bottomSheetRef: MatBottomSheetRef<NotServicebleComponent>,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService,
    private commonService: CommonService,
    private snackbar: MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.location = data.location;
    this.name = data.name
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
    // this.mailText = `mailto:partners@zataakse.com?subject=Restaurant-Request&body=name:${this.restaurantData.name}<br> contact:${this.restaurantData.contact}<br> address:${this.restaurantData.address}`;
   // window.location.href = this.mailText;
    this.dataService.recommendRest({...this.commonService.getRequestEssentialParams(), data: {
      mobileNum: this.restaurantData.contact,
      restAddr: this.restaurantData.address,
      restName: this.restaurantData.name,
    }}).subscribe(res => {
      this.closePage();
      console.log('Restaurant Recom');
    }, (err) => {
      this.snackbar.open(err.error.message);
    });
    // TODO: Integrate recom restaurant
    // this.bottomSheet.open(PreRegisterComponent, {});
  }
}
