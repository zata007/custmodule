import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CustomerService } from '../../customer.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service'

@Component({
  selector: 'app-bottom-address',
  templateUrl: './bottom-address.component.html',
  styleUrls: ['./bottom-address.component.scss']
})
export class BottomAddressComponent implements OnInit {
  addressForm: FormGroup;
  allValidate: boolean = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<BottomAddressComponent>,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.addressForm = new FormGroup ({
      addLine1: new FormControl(''),
      addLine2: new FormControl(''),
      locality: new FormControl(''),
      landmark: new FormControl(''),
      addType: new FormControl('')
    });

  }

  validate() {
    if(this.addressForm['addLine1'].length>2 && this.addressForm['landmark'].length>2 && this.addressForm['locality'].length>2 ) {
      this.allValidate = true;
    };
    console.log('called')
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  saveAddress() {
    this.data = {
      ...this.data,
      "addType": this.addressForm.value['addType'],
      "addLine1": this.addressForm.value['addLine1'],
      "addLine2": this.addressForm.value['addLine2'],      
      "locality": this.addressForm.value['locality'],
      "landmark": this.addressForm.value['landmark']
    }
    console.log(this.data);
    this.dataService.manageAddress(this.data).subscribe((data: any) =>{
      console.log(data);
      this._bottomSheetRef.dismiss();
      this.router.navigate(['customer/profile'])
    })
  }

}
