import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { SigninOtpComponent } from '../signin-otp/signin-otp.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { IMobileLoginData, IResponseLoginSignup, ILoginData, ILoginSignupData, IRequestVerifyOtp, IResponseGetProfileData } from 'src/app/shared/models/common-model';
import {
  FacebookLoginProvider,
  AuthService,
  SocialUser
} from 'angularx-social-login';
// import { PrelaunchService } from 'src/app/pre-launch/prelaunch.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { SignupComponent } from '../signup/signup.component';
import { ELoginSignup } from '../models';
import { SignIn } from 'src/app/store/actions/customer.actions';
import { IAppState } from 'src/app/store/states/app.states';
import { Store } from '@ngrx/store';
import { CookieService } from 'src/app/shared/services/cookie.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ZATAAKSE_JWT_TOKEN, ZATAAKSE_PROFILE_DATA } from 'src/app/shared/constants/constants';
import { CustomerService } from 'src/app/customer-app/customer.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  // @ViewChild(SignupComponent) signupComponent: SignupComponent;
  selected = 0;
  ELoginSignup = ELoginSignup;
  loginMobNumber = null;
  isRegistrationFormValid = false;
  user: SocialUser;
  userByMobile: ILoginSignupData;
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
    private customerService: CustomerService,
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
    const {fingerprint, lan} = this.commonService.getRequestEssentialParams();
    const data: IRequestVerifyOtp =  {
      userId: this.userByMobile.userId,
      mobileOTP: otp,
      pRoleId: this.userByMobile.pRoleId,
      pRelationId: this.userByMobile.pRelationId,
      fingerprint,
      lan
    };
    this.dataService.verifyOtp(data).subscribe(
      (res) => {
        this.bottomSheet.dismiss();
        const data = { ...res.data.indDetail };
        localStorage.setItem(ZATAAKSE_JWT_TOKEN, data.accessToken);
        this.customerService.getProfile(localStorage.getItem(ZATAAKSE_JWT_TOKEN)).subscribe((data: IResponseGetProfileData) => {
          // Store profile data
          localStorage.setItem(ZATAAKSE_PROFILE_DATA, JSON.stringify(data.data));
        });
        // data.id = data._id;
        // this.store.dispatch(new SignIn(data));
        // this.cookieService.setUserData(data);
        // if navigated from cart then navigate back to cart-view page
        this.router.navigate(['customer']);
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
        // this.signupComponent.register();
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
    }).subscribe((res: IResponseLoginSignup) => {
      console.log(res, `${type} done`);
      this.userByMobile = res.data;
      this.openVerifyOTP();
    }, error => {
      if (error.error.statusCode === 400) {
        this.bottomSheet.open(SigninOtpComponent, {
          data: {
            isNotRegistered: true,
            onProceed: (typeInfo) => this.onProceedFromBottomSheet(typeInfo)
          }
        });
      } else{
        error = error.json();
        this.snack.open(error.message);
      }
    });

    // this.loginService.loginByNumber(num).subscribe(
    //   res => {
    //     this.userByMobile = { ...res.data };
    //     //this.prelaunchService.setUserId(this.userByMobile.userId);
    //     this.openVerifyOTP();
    //   },
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
      // this.prelaunchService.userData = res;
      this.router.navigate(['pre-launch/landing-page']);
    });
  }

  onSignupDataChange(value: any) {
    this.signupData = value;

  }

  onPanelSelect(selected: number) {
    this.selected = selected;
  }
}
