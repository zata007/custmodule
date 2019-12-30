import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatBottomSheet, MatDialog } from '@angular/material';
import { CookieService } from 'src/app/shared/service/cookie.service';
import { PrelaunchService } from '../prelaunch.service';
import { LocationPopupComponent } from '../../location-popup/location-popup.component';

@Component({
  selector: 'app-zataakse-slider',
  templateUrl: './zataakse-slider.component.html',
  styleUrls: ['./zataakse-slider.component.scss']
})
export class ZataakseSliderComponent implements OnInit {

  constructor(
    private router: Router,
    private prelaunchService: PrelaunchService,
    private cookieService: CookieService,
    private bottomsheet: MatBottomSheet
  ) { }

  ngOnInit() {
  }

  onSubmitButtonClick() {
    const disRef = this.bottomsheet.open(LocationPopupComponent, {
      data: {
        isLocationNotAllowed: false,
      }
    });
    disRef.afterDismissed().subscribe(() => {
      this.setCurrentLocation();
    });
  }

  setCurrentLocation() {
    // this.canShowLocationPopup = false;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.cookieService.setLocationPermissionStatus(true);
          this.prelaunchService.setLocationData(latitude, longitude);
          this.router.navigate(['login-signup']);
        },
        error => {
          // User blocked location
          // LocationPopupComponent
          if (error.code === 1) {
            // this.canShowLocationPopup = true;
            this.bottomsheet.open(LocationPopupComponent, {
              data: {
                isLocationNotAllowed: true,
              }
            });
            this.cookieService.setLocationPermissionStatus(false);
          }
          console.log(error);
        }
      );
    }
  }

}
