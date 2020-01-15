import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.commonService.setUserLocation(latitude, longitude);
          // Get Platform params
          // TODO: GET /params/getPlatformParams
          this.dataService
            .getPlatformParams({
              ...this.commonService.getRequestEssentialParams()
            })
            .subscribe(res => {
              // TODO: Save Params
              // {
              //   "message": "Success",
              //   "data": {
              //     "rolesData": [
              //       {
              //         "_id": "5e074504f79ac3c66bb20713",
              //         "roleCode": "IN",
              //         "defaultAuthority": 0,
              //         "roleName": "Individual"
              //       },
              //       {
              //         "_id": "5e074f9f7dc0df7026b77848",
              //         "roleCode": "Co",
              //         "defaultAuthority": 2,
              //         "roleName": "Corporate"
              //       },
              //       {
              //         "_id": "5e0f5ef03f159b0288c7cdac",
              //         "roleCode": "man",
              //         "defaultAuthority": 3,
              //         "roleName": "Manager"
              //       },
              //       {
              //         "_id": "5e19c80a0aae873d89c58c22",
              //         "roleCode": "adm",
              //         "defaultAuthority": 11,
              //         "roleName": "Admin"
              //       }
              //     ],
              //     "relationsData": [
              //       {
              //         "_id": "5e074504f79ac3c66bb20714",
              //         "relationCode": "C",
              //         "defaultAuthority": 0,
              //         "relationName": "Customer"
              //       },
              //       {
              //         "_id": "5e074f897dc0df7026b77840",
              //         "relationCode": "E",
              //         "defaultAuthority": 2,
              //         "relationName": "Employee"
              //       },
              //       {
              //         "_id": "5e0f5ec13f159b0288c7cda4",
              //         "relationCode": "M",
              //         "defaultAuthority": 3,
              //         "relationName": "Maker"
              //       },
              //       {
              //         "_id": "5e19c73640e98d3293d328a3",
              //         "relationCode": "Adm",
              //         "defaultAuthority": 11,
              //         "relationName": "Admin"
              //       }
              //     ],
              //     "languageData": [
              //       {
              //         "_id": "5e1d92c3cbfb695b99219d80",
              //         "code": "en",
              //         "name": "English"
              //       }
              //     ],
              //     "interfaceData": [
              //       {
              //         "_id": "5e1afdfd5935712d13e22bbc",
              //         "name": "Customer",
              //         "pRelationId": "5e074504f79ac3c66bb20714",
              //         "pRoleId": "5e074504f79ac3c66bb20713"
              //       },
              //       {
              //         "_id": "5e1b0c5d5935712d13ec04c6",
              //         "name": "Admin",
              //         "pRelationId": "5e19c73640e98d3293d328a3",
              //         "pRoleId": "5e19c80a0aae873d89c58c22"
              //       }
              //     ],
              //     "addressTypesData": [
              //       {
              //         "_id": "5e074504f79ac3c66bb206c2",
              //         "type": "Office Address"
              //       },
              //       {
              //         "_id": "5e0745fb7dc0df7026b7781a",
              //         "type": "Residential Address"
              //       },
              //       {
              //         "_id": "5e074f48f79ac3c66bb4854d",
              //         "type": "Registered Office"
              //       }
              //     ],
              //     "designationsData": [
              //       {
              //         "_id": "5e074504f79ac3c66bb207ba",
              //         "name": "Manager"
              //       },
              //       {
              //         "_id": "5e074f4b7dc0df7026b77827",
              //         "name": "Owner"
              //       }
              //     ]
              //   }
              // }
              console.log(res);
            });
        },
        error => {
          // User blocked location
          // LocationPopupComponent
          console.log(error);
        }
      );
    }
  }
}
