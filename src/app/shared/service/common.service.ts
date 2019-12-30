import { Injectable } from '@angular/core';
import { IUserDetails } from '../models/common-model';
import { BehaviorSubject } from 'rxjs';

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


  setUserConnectedStatus(value: boolean) {
    this.isUserConnectedSubject.next(value);
  }

  setFingerPrint(murmur: string) {
    this.fingerPrintData = murmur;
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
}
