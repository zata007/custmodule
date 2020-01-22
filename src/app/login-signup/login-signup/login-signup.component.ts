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
import { DataService } from 'src/app/shared/services/data.service';

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
  signupData: any;
  constructor(
    private bottomSheet: MatBottomSheet,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar,
    private store: Store<IAppState>,
    private cookieService: CookieService,
    private commonService: CommonService,
    private dataService: DataService,
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
        this.handleLoginSignupRequest('login');
        return;
      case ELoginSignup.Signup:
        this.handleLoginSignupRequest('register');
        //this.signupComponent.register();
        return;

      default:
        break;
    }
  }

  handleLoginSignupRequest(type: string) {

     // TODO: Send register data.
    const params = this.commonService.getPlatformParams();
    const { latitude, longitude} = this.commonService.getRequestEssentialParams();
    this.dataService.registerLogin({
      ...this.commonService.getRequestEssentialParams(),
      data: {
        indMobileNum: type === 'register' ? this.signupData.mobileNumber : this.loginMobNumber,
        indCountryCode: '91',
        pRoleId: params.interfaceData[0].pRoleId,
        pRelationId: params.interfaceData[0].pRelationId,
        pInterface: params.interfaceData[0]._id,
        reqType: type,
        indEmailNotify: true,
        indMobileNotify: true,
        indPushNotify: true,
        latitude,
        longitude,

      }
    }).subscribe(res => {
      console.log(res, `${type} done`);
    });

    // this.loginService.loginByNumber(num).subscribe(
    //   res => {
    //     this.userByMobile = { ...res.data };
    //     //this.prelaunchService.setUserId(this.userByMobile.userId);
    //     this.openVerifyOTP();
    //   },
    //   error => {
    //     if (error.error.statusCode === 400) {
    //       this.bottomSheet.open(SigninOtpComponent, {
    //         data: {
    //           isNotRegistered: true,
    //           onProceed: (type) => this.onProceedFromBottomSheet(type)
    //         }
    //       });
    //     }
    //   }
    // );
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

  onSignupDataChange(value: any){
    this.signupData = value;

  }

  onPanelSelect(selected: number) {
    this.selected = selected;
  }
}
