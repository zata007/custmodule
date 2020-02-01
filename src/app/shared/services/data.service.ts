import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginData, IMobileLoginData,
   IRequestRegister, IRequestGetRestaurantData, IRequestGetSkuData, IRequestVerifyOtp, IRequestPlaceOrder, IResponsePlaceOrder } from '../models/common-model';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class DataService {
  lan = '';
  fingerprint = '';
  constructor(private httpClient: HttpClient) { }

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
  }): Observable<any> {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()  // 22.484977, 88.384863
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

  getRestauratData(data: IRequestGetRestaurantData) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
      params: {
        isOrderAhead: '' + data.isOrderAhead,
        isDelivery: '' + data.isDelivery,
        isTakeAway: '' + data.isTakeAway,
        pitstopLatitude: data.pitstopLatitude ? data.pitstopLatitude.toString() : null,
        pitstopLongitude: data.pitstopLongitude ? data.pitstopLongitude.toString() : null,
        pageNum: data.page ? data.page.toString() : '1' // TODO: Remove once pagination is implemented
      }
    };
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.USER}/getRestaurants`, options);
  }

  getSku(data: IRequestGetSkuData) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
      params: {
        flag: data.flag.toString(),
        pageNum: data.pageNum ? data.pageNum.toString() : '1' // TODO: Remove once pagination is implemented
      }
    };

    if (data.pitstopLatitude && data.pitstopLongitude) {
      // tslint:disable-next-line: no-string-literal
      options.params['pitstopLatitude'] = data.pitstopLatitude.toString();
      // tslint:disable-next-line: no-string-literal
      options.params['pitstopLongitude'] = data.pitstopLongitude.toString();
    }

    if (data.businessLocId) {
      // tslint:disable-next-line: no-string-literal
      options.params['businessLocId'] = data.businessLocId;
    }

    // delete pitstops
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.USER}/getSku`, options);
  }

  registerLogin(data: { fingerprint: string, lan: string, data: IRequestRegister }) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan,
      }
    };

    // POST /access/user/registerLogin
    return this.httpClient.post(`${environment.API_Endpoint}/${API_ENDPOINTS.ACCSSS}/${API_ENDPOINTS.USER}/registerLogin`, data.data, options);
  }



  verifyOtp(data: IRequestVerifyOtp): Observable<any> {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.ACCSSS}/${API_ENDPOINTS.USER}/verifyOTP`;
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan
      },
    };
    delete data.fingerprint;
    delete data.lan;
    return this.putMethod(url, options, data);
  }

  placeOrder(data: IRequestPlaceOrder): Observable<IResponsePlaceOrder> {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/placeAnOrder`;
    const options = {
      headers: {
        ...this.getOptions(),
      },
    };
    return this.putMethod(url, options, data) as any;
  }
}
