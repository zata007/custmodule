import { Injectable } from '@angular/core';
import { IUserDetails, IPlatformParams } from '../models/common-model';
import { BehaviorSubject } from 'rxjs';
import { ZATAAKSE_PREF_LANG } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class CommonService {
  // Move this to store
  loadingData$ = new BehaviorSubject<boolean>(false);

  isUserConnectedSubject = new BehaviorSubject(true);
  isUserConnected$ = this.isUserConnectedSubject.asObservable();
  userDetails: IUserDetails = null;
  userId: any;
  haslocationData = false;
  fingerPrintData = null;
  platformParams = null;
  userLocation = {
    latitude: 0,
    longitude: 0,
  };


  setUserConnectedStatus(value: boolean) {
    this.isUserConnectedSubject.next(value);
  }

  setUserLocation(lat: number, lng: number) {
    this.userLocation = {
      latitude: lat,
      longitude: lng
    };
  }

  setFingerPrint(murmur: string) {
    this.fingerPrintData = murmur;
  }

  setPlatformParams(data: IPlatformParams) {
    this.platformParams = data;
  }

  getPlatformParams(): IPlatformParams {
    return this.platformParams;
  }

  get fingerPrint() {
    return this.fingerPrintData;
  }

  getUserConnectedStatus() {
    return this.isUserConnectedSubject.value;
  }

  setDataLoading(value: boolean) {
    this.loadingData$.next(value);
  }

  getRequestEssentialParams() {
    return {
      fingerprint: this.fingerPrint,
      lan: localStorage.getItem(ZATAAKSE_PREF_LANG) || 'en',
      latitude: this.userLocation.latitude,
      longitude: this.userLocation.longitude,
    };
  }
}
