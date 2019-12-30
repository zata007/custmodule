import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISignUpData } from '../shared/models/common-model';
import { CommonService } from '../shared/service/common.service';
import { Observable } from 'rxjs';
import { CookieService } from '../shared/service/cookie.service';
//import { SocialUser } from 'angularx-social-login';

@Injectable()
export class PrelaunchService {
  signUpData: ISignUpData = {
    fullName: '',
    latitude: 0,
    longitude: 0,
    email: '',
    mobileNumber: '',
    referralCodeUsed: '',
    foodPreference: 'v', // TODO: Add toggle to form.
    lanPreference: 'en',
  };
  
  //userData: SocialUser = null;

  userId: any;
  constructor(private httpClient: HttpClient, private commonService: CommonService, private cookieService: CookieService) {}

  getOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  // postMethod(url: string, param: any) {
  //   const postUrl = `${environment.USER_API_Endpoint}/${url}`;
  //   const options = this.getOptions();
  //   return this.httpClient.post(postUrl, param, options);
  // }

  // putMethod(url: string, data?: any) {
  //   const putUrl = `${environment.USER_API_Endpoint}/${url}`;
  //   const options = this.getOptions();
  //   options.headers['Content-type'] = 'application/x-www-form-urlencoded';
  //   return this.httpClient.put(putUrl, data, options);
  // }

  // userOnBoard(data: ISignUpData) {
  //   return this.postMethod(`userOnboard`, data);
  // }

  // verifyUser(answer: string[], mobileOTP: string): Observable<any> {
  //   let answr = '[';
  //   answer.forEach((i) => {
  //     answr += `"${i}",`;
  //   });

  //   answr = answr.slice(0, -1);
  //   answr += ']';
  //   const formData = `quesReply=${answr}&mobileOTP=${mobileOTP}&lanPreference=${this.cookieService.getAppLanguage()}`;

  //   return this.putMethod(`verifyUser/${this.userId}`, formData);
  // }

  // resendOTP() {
  //   return this.putMethod(`${this.cookieService.getAppLanguage()}/resendUserOTP/${this.userId}`);
  // }

  setReferralCode(value: string) {
    this.signUpData.referralCodeUsed = value;
  }

  getReferralCode() {
    return this.signUpData.referralCodeUsed;
  }

  getSignupData() {
    return this.signUpData;
  }

  setLocationData(lat: number, long: number) {
    this.signUpData.latitude = lat;
    this.signUpData.longitude = long;
    this.commonService.haslocationData = true;
  }

  setUserData(formData: any) {
    const fullName = `${formData.firstName} ${formData.lastName || ''}`;
    this.signUpData.fullName = fullName;
    this.signUpData.email = formData.email;
    this.signUpData.mobileNumber = `+91${formData.mobileNumber}`;
    this.signUpData.referralCodeUsed = formData.referalCode || 'null';
  }

  setUserId(userId: any) {
    this.userId = userId;
  }

  // registerUser() {
  //   this.signUpData.lanPreference = this.cookieService.getAppLanguage();
  //   return this.userOnBoard(this.signUpData);
  // }
}
