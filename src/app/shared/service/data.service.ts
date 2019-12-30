import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISignUpData, ILoginData, IMobileLoginData } from '../models/common-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

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

  // getMethod(url: string, params: any) {
  //   const getUrl = `${environment.USER_API_Endpoint}/${url}`;
  //   return this.httpClient.get(getUrl, params);
  // }

  // addSubscriber(subscription: any) {
  //   return this.postMethod('cS/sendPushNotification', subscription);
  // }

  // putMethod(url: string, options: any, data?: any) {
  //   return this.httpClient.put(url, data, options);
  // }

  // loginByNumber(data: ILoginData): Observable<any> {
  //   const url = `${environment.USER_API_Endpoint}/userLogin`;
  //   const options = this.getOptions();
  //   return this.putMethod(url, options, data);
  // }

  // verifyOtp(userByMobile: IMobileLoginData): Observable<any> {
  //   const url = `${environment.USER_API_Endpoint}/verifyOTP`;
  //   const options = this.getOptions();
  //   return this.putMethod(url, options, userByMobile);
  // }
}
