import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  ILoginData,
  IMobileLoginData,
  IOrderData,
  IUpdateProfiledata,
  IRequestRegister,
  IRequestGetRestaurantData,
  IRequestGetSkuData,
  IRequestVerifyOtp,
  IRequestPlaceOrder,
  IResponsePlaceOrder,
  IVehicleData,
  IProfileData
} from '../models/common-model';
import {
  Observable
} from 'rxjs';
import {
  API_ENDPOINTS,
  ZATAAKSE_JWT_TOKEN,
  ZATAAKSE_PREF_LANG
} from '../constants/constants';
import {
  Socket
} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  lan = '';
  fingerprint = '';
  paymentStatus$ = this.socket.fromEvent < {
    _id: string,
    paymentStatus: string
  } > ('getOrderPaymentStatus');
  constructor(private httpClient: HttpClient, private socket: Socket) {}

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

  getOrderStatus(orderId: string) {
    const data = {
      orderId
    };
    this.socket.emit('getOrderPaymentStatus', data);
  }

  addSubscriber(subscription: any) {
    return this.postMethod('cS/sendPushNotification', subscription);
  }

  putMethod(url: string, options: any, data ? : any) {
    return this.httpClient.put(url, data, options);
  }

  loginByNumber(data: ILoginData): Observable < any > {
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
  }): Observable < any > {
    const options: any = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        fingerprint: data.fingerprint,
        lan: data.lan,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString() // 22.484977, 88.384863
      },
    };
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.USER}/isLocationServed`, options);
  }

  checkServiceAvailable(data: {
    fingerprint: string,
    lan: string
  }) {
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint: data.fingerprint,
        lan: data.lan
      },
    };
    return this.httpClient.get(`${environment.API_Endpoint}/${API_ENDPOINTS.ACCSSS}/checkInternet`, options);
  }

  getPlatformParams(data: {
    fingerprint: string,
    lan: string,
    latitude: number,
    longitude: number
  }) {
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

  registerLogin(data: {
    fingerprint: string,
    lan: string,
    data: IRequestRegister
  }) {
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



  verifyOtp(data: IRequestVerifyOtp): Observable < any > {
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

  placeOrder(data: IRequestPlaceOrder): Observable < IResponsePlaceOrder > {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/placeAnOrder`;
    const options = {
      headers: {
        ...this.getOptions(),
        authorization: localStorage.getItem(ZATAAKSE_JWT_TOKEN)
      },
    };
    return this.putMethod(url, options, data) as any;
  }

  updateProfile(data: IUpdateProfiledata): Observable < IProfileData > {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/updateProfile`;
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',        
        authorization: localStorage.getItem(ZATAAKSE_JWT_TOKEN)
      }
    }
    return this.putMethod(url, options, data) as any;
  }

  addCart(fingerprint: string, data: IOrderData, position: {
    lat: number,
    lng: number
  }) {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/addCart`;
    const options = {
      headers: {
        ...this.getOptions(),
        fingerprint,
        latitude: position.lat + '',
        longitude: position.lng + '',
        lan: localStorage.getItem(ZATAAKSE_PREF_LANG)
      },
    };
    return this.putMethod(url, options, data) as any;
  }

  manageVehicle(data: IVehicleData): Observable < {
    message: string;data: {
      indVehicles: IVehicleData[]
    }
  } > {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/manageVehicle`;
    const options = {
      headers: {
        ...this.getOptions(),
        authorization: localStorage.getItem(ZATAAKSE_JWT_TOKEN)
      },
    };
    return this.putMethod(url, options, data) as any;
  }

  manageAddress(data: {
    addressId ? : string,
    x: string,
    addType: string,
    addLine1: string,
    addLine2: string,
    city: string,
    locality ? : string,
    landmark ? : string,
    state: string,
    country: string,
    postal: string,
    latitude: number,
    longitude: number
  }) {
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.USER}/manageAddress`;
    const options = {
      headers: {
        ...this.getOptions(),
        authorization: localStorage.getItem(ZATAAKSE_JWT_TOKEN)
      },
    };
    const resData = {
      addrType: data.addType,
      addrLine1: data.addLine1,
      addrLine2: data.addLine2,
      city: data.city,
      locality: data.locality,
      landmark: data.landmark,
      state: data.state,
      country: data.country,
      pincode: data.postal,
      latitude: data.latitude,
      longitude: data.longitude
    };
    return this.putMethod(url, options, resData) as any;
  }

  resendOTP(userData: {
    userId: string,
    pRoleId: string,
    pRelationId: string
  },
            fingerprint: string) {
    // return this.httpClient.put(`${environment.API_Endpoint}/${API_ENDPOINTS.OA}/${lng}/resendOTP/${userId}`, undefined);
    const url = `${environment.API_Endpoint}/${API_ENDPOINTS.ACCSSS}/${API_ENDPOINTS.USER}/resendOTP`;
    const options = {
      headers: {
        ...this.getOptions(),
        lan: localStorage.getItem(ZATAAKSE_PREF_LANG) || 'en',
        fingerprint
      },
    };
    return this.putMethod(url, options, userData) as any;
  }
}
