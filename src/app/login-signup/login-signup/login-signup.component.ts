import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { SigninOtpComponent } from '../signin-otp/signin-otp.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { IMobileLoginData } from 'src/app/shared/models/common-model';
import {
  FacebookLoginProvider,
  AuthService,
  SocialUser
} from 'angularx-social-login';
//import { PrelaunchService } from 'src/app/pre-launch/prelaunch.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { SignupComponent } from '../signup/signup.component';
import { ELoginSignup } from '../models';
import { SignIn } from 'src/app/store/actions/customer.actions';
import { IAppState } from 'src/app/store/states/app.states';
import { Store } from '@ngrx/store';
import { CookieService } from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  //@ViewChild(SignupComponent) signupComponent: SignupComponent;
  selected = 0;
  ELoginSignup = ELoginSignup;
  loginMobNumber = null;
  isRegistrationFormValid = false;
  user: SocialUser;
  userByMobile: IMobileLoginData = {
    userId: '',
    lanPreference: '',
    fingerprint: '',
    mobileOTP: null
  };
  constructor(
    private bottomSheet: MatBottomSheet,
    private loginService: LoginService,
    private authService: AuthService,
    //private prelaunchService: PrelaunchService,
    private router: Router,
    private snack: MatSnackBar,
    private store: Store<IAppState>,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {}

  onLoginNumberUpdate(mobNumber: number) {
    // console.log(mobNumber);
    this.loginMobNumber = mobNumber;
  }

  openVerifyOTP() {
    this.bottomSheet.open(SigninOtpComponent, {
      data: {
        isOtp: true,
        onProceed: (otp) => this.verifyLoginOtp(otp),
      }
    });
  }

  verifyLoginOtp(otp: number) {
    this.userByMobile.mobileOTP = otp;
    this.loginService.verifyOtp(this.userByMobile).subscribe(
      (res) => {
        this.bottomSheet.dismiss();
        const data = { ...res.data.userDetails };
        data.id = data['_id'];
        this.store.dispatch(new SignIn(data));
        this.cookieService.setUserData(data);
        this.router.navigate(['/customer']);
      },
      (err) => {
        this.bottomSheet.dismiss();
      }
    );
  }

  onSubmitButtonClick() {
    switch (this.selected) {
      case ELoginSignup.Login:
        this.loginByNumber();
        return;
      case ELoginSignup.Signup:
        //this.signupComponent.register();
        return;

      default:
        break;
    }
  }

  loginByNumber() {
    if (!this.loginByNumber || this.loginMobNumber < 100000) {
      this.snack.open('Please provide valid number');
      return;
    }
    const num = '+91' + this.loginMobNumber;
    this.loginService.loginByNumber(num).subscribe(
      res => {
        this.userByMobile = { ...res.data };
        //this.prelaunchService.setUserId(this.userByMobile.userId);
        this.openVerifyOTP();
      },
      error => {
        if (error.error.statusCode === 400) {
          this.bottomSheet.open(SigninOtpComponent, {
            data: {
              isNotRegistered: true,
              onProceed: (type) => this.onProceedFromBottomSheet(type)
            }
          });
        }
      }
    );
  }

  onProceedFromBottomSheet(type: number) {
    switch (type) {
      case ELoginSignup.Login:
        this.onPanelSelect(ELoginSignup.Login);
        return;
      case ELoginSignup.Signup:
        this.onPanelSelect(ELoginSignup.Signup);
        return;

      default:
        break;
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.user = res;
      //this.prelaunchService.userData = res;
      this.router.navigate(['pre-launch/landing-page']);
    });
  }

  onPanelSelect(selected: number) {
    this.selected = selected;
  }
}
