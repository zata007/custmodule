import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddVehicleComponent } from '../../vehicle/add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-bottom-vehicle',
  templateUrl: './bottom-vehicle.component.html',
  styleUrls: ['./bottom-vehicle.component.scss']
})
export class BottomVehicleComponent implements OnInit {

  constructor( private bottomSheet: MatBottomSheet ) { }

  ngOnInit() {
  }

  addVehicle() {
    this.bottomSheet.open(AddVehicleComponent);
  }

}
