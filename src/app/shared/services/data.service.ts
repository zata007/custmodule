import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginData, IMobileLoginData, IRequestRegister } from '../models/common-model';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class DataService {
  lan = '';
  fingerprint = '';
  constructor(private httpClient: HttpClient) {}

  getOptions() {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
  }

  postMethod(url: string, param: any) {
    const postUrl = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/${url}`;
    const options = {
      headers: this.getOptions()
    };
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
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/userLogin`;
    const options = {
      headers: this.getOptions()
    };
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
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.USER}/isLocationServed`, options);
  }

  checkServiceAvailable(data: { fingerprint: string, lan: string }) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan
      },
    };
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.ACCSSS}/checkInternet`, options);
  }

  getPlatformParams(data: { fingerprint: string, lan: string, latitude: number, longitude: number }) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
      params: {
        flag: '0'
      }
    };
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.PARAMS}/getPlatformParams`, options);
  }

  registerLogin(data: {fingerprint: string, lan: string, data: IRequestRegister }) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan,
      }
    };
    return this.httpClient.post(`${environment.API_Endpoint}/${API_ENDPOINTS.PARAMS}/getPlatformParams`, data.data, options);
  }



  verifyOtp(userByMobile: IMobileLoginData): Observable<any> {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/verifyOTP`;
    const options = {
      headers: this.getOptions()
    };
    return this.putMethod(url, options, userByMobile);
  }
}
