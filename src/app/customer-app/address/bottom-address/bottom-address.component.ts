import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddAddressComponent } from '../../address/add-address/add-address.component';

@Component({
  selector: 'app-bottom-address',
  templateUrl: './bottom-address.component.html',
  styleUrls: ['./bottom-address.component.scss']
})
export class BottomAddressComponent implements OnInit {

  constructor( private bottomSheet: MatBottomSheet ) { }

  ngOnInit() {
  }

  addAddress() {
    this.bottomSheet.open(AddAddressComponent);
  }

}
