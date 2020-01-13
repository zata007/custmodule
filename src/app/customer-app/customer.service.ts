import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from '../shared/services/cookie.service';

@Injectable()
export class CustomerService {
  locationData = {
    latitude: 0,
    longitude: 0,
  };

  selectedPlaces: { from: google.maps.places.PlaceResult; to: google.maps.places.PlaceResult } = {
    from: null,
    to: null,
  };
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

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
    const getUrl = `${environment.USER_API_Endpoint}/${url}`;
    return this.httpClient.get(getUrl , params);
  }

  setLocationData(lat: number, long: number) {
    this.locationData.latitude = lat;
    this.locationData.longitude = long;
  }

  setSelectedPlace(place: google.maps.places.PlaceResult, isFrom: boolean) {
    if (isFrom) {
      this.selectedPlaces.from = place;
    } else {
      this.selectedPlaces.to = place;
    }
  }

  getPitstops(requestData: {
    fingerprint: string,
    lan: string,
    latitude: number,
    longitude: number,
    sourcePoint: Array<number>,
    destnationPoint: Array<number>,
  }) {
    const data = {
      sourcePoint: [72.870403, 19.130181], // lng, lon
      destnationPoint: [72.870403, 19.130181]
    };
    const params = new HttpParams()
      .set('sourcePoint', JSON.stringify(data.sourcePoint))
      .set('destnationPoint', JSON.stringify(data.destnationPoint));

    //http://52.66.208.60:8000/user/findPitstops
    const getUrl = `${environment.USER_API_Endpoint}/findPitstops`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      fingerprint: requestData.fingerprint,
      lan: requestData.lan,
      latitude: requestData.latitude.toString(),
      longitude: requestData.longitude.toString()
    };
    return this.httpClient.get(getUrl, { headers, params });
  }

  placeOrder(cart: { name: string; catagory: string; price: number }[]) {
    const resData = {
      userId: this.cookieService.getUserData().id,
      orderedItems: cart.map((i) => {
        return { price: i.price, itemName: i.name };
      }),
    };
    return this.postMethod('placeAnOrder', resData);
  }
}
