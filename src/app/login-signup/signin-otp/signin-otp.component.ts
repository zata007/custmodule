import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';
//import { PrelaunchService } from 'src/app/pre-launch/prelaunch.service';
import { ELoginSignup } from '../models';

export interface ISigninOtpComponentData {
  isNotRegistered: boolean;
  isFailed: boolean;
  isAlreadyRegistered: boolean;
  isOtp: boolean;
  onProceed: (type: any) => void;
}

@Component({
  selector: 'app-signin-otp',
  templateUrl: './signin-otp.component.html',
  styleUrls: ['./signin-otp.component.scss']
})
export class SigninOtpComponent implements OnInit {
  otp = null;
  isFailed = false;
  isNotRegistered = false;
  isAlreadyRegistered = false;
  isOtp = false;
  constructor(
    private matSnackBar: MatSnackBar,
    //private prelaunchService: PrelaunchService,
    private bottomSheetRef: MatBottomSheetRef<SigninOtpComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ISigninOtpComponentData
  ) {
    this.isNotRegistered = data.isNotRegistered;
    this.isFailed = data.isFailed;
    this.isAlreadyRegistered = data.isAlreadyRegistered;
    this.isOtp = data.isOtp;
  }

  ngOnInit() {}

  onClose() {
    this.bottomSheetRef.dismiss();
  }

  gotoLogin() {
    this.onClose();
    this.data.onProceed(ELoginSignup.Login);
  }

  gotoSignup() {
    this.onClose();
    this.data.onProceed(ELoginSignup.Signup);
  }

  verifyOtp() {
    this.data.onProceed(this.otp);
  }

  resendOTP() {
    // this.prelaunchService.resendOTP().subscribe((d: any) => {
    //   this.matSnackBar.open(d.message);
    // });
  }

  getHeaderText(): string {
    if (this.isNotRegistered) {
      return 'You are not registered';
    } else if (this.isAlreadyRegistered) {
      return 'Already Registered';
    }
    return 'Verify OTP';
  }
}
