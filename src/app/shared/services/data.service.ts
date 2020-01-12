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

  postMethod(url: string, param: any) {
    const postUrl = `${environment.USER_API_Endpoint}/${url}`;
    const options = this.getOptions();
    return this.httpClient.post(postUrl, param, options);
  }

  getMethod(url: string, params: any) {
    return this.httpClient.get(url, params);
  }

  addSubscriber(subscription: any) {
    return this.postMethod('cS/sendPushNotification', subscription);
  }

  putMethod(url: string, options: any, data?: any) {
    return this.httpClient.put(url, data, options);
  }

  loginByNumber(data: ILoginData): Observable<any> {
    const url = `${environment.USER_API_Endpoint}/userLogin`;
    const options = this.getOptions();
    return this.putMethod(url, options, data);
  }

  checkZataakseServiceAvailable(data: {
    fingerprint: string
    lan: string
    latitude: number
    longitude: number
  }) {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
    };
    return this.httpClient.get(`${environment.USER_API_Endpoint}/checkZataakseService`, options);
  }

  checkServiceAvailable(data: { fingerprint: string, lan: string }) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        fingerprint: data.fingerprint,
        lan: data.lan
      },
    };
    return this.httpClient.get(`${environment.ACCESS_API_ENDPOINT}/checkInternet`, options);
  }



  verifyOtp(userByMobile: IMobileLoginData): Observable<any> {
    const url = `${environment.USER_API_Endpoint}/verifyOTP`;
    const options = this.getOptions();
    return this.putMethod(url, options, userByMobile);
  }
}
