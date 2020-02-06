import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
  vehicle: any[] = [];
  vehicleType: string[]= new Array("Hatchback", "Sedan", "MUV", "SUV", "Luxury", "Convertible", "Coupe", "Minivan", "Pickup Truck", "Wagon");

  constructor(
    private bottomSheet: MatBottomSheet,
    private dataService: DataService,    
    private _bottomSheetRef: MatBottomSheetRef<BottomVehicleComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.vehicleForm = new FormGroup ({
      vehType: new FormControl(''),
      vehbrand: new FormControl(''),
      vehModel: new FormControl(''),
      vehNum: new FormControl(''),      
      vehColor: new FormControl('')
    });
  }

  validate() {}

  saveVehicle() {
    this.dataService.manageVehicle(this.vehicleForm.value).subscribe((data: any) =>{
      console.log(data);
      this.vehicle.push(data.data.indVehicles);
      console.log(this.vehicle);
      this._bottomSheetRef.dismiss();
      this.router.navigate(['customer/profile'])
    })
  }

}
