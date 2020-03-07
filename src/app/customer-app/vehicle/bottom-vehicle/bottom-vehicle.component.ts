import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AddVehicleComponent } from '../../vehicle/add-vehicle/add-vehicle.component';
import { FormGroup, FormControl } from '@angular/forms';
import { IVehicleData } from '../../../shared/models/common-model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-bottom-vehicle',
  templateUrl: './bottom-vehicle.component.html',
  styleUrls: ['./bottom-vehicle.component.scss']
})
export class BottomVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleType: string[] = new Array('Hatchback', 'Sedan', 'MUV', 'SUV', 'Luxury',
   'Convertible', 'Coupe', 'Minivan', 'Pickup Truck', 'Wagon');

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: IVehicleData,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService,
    private bottomSheetRef: MatBottomSheetRef<BottomVehicleComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.vehicleForm = new FormGroup ({
      vehicleId: new FormControl(),
      vehType: new FormControl(''),
      vehbrand: new FormControl(''),
      vehModel: new FormControl(''),
      vehNum: new FormControl(''),
      vehColor: new FormControl('')
    });
    if (this.data) {
      this.vehicleForm.patchValue({...this.data});
    }
  }

  validate() {}

  saveVehicle() {
    this.dataService.manageVehicle(this.vehicleForm.value).subscribe((data) => {
      this.bottomSheetRef.dismiss(data.data.indVehicles);
    });
  }

}
