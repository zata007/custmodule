import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoLocationService {
  coordinates: any;

  constructor() {}

  public getPosition(): Observable<Position> {
    return Observable.create((observer) => {
      navigator.geolocation.watchPosition(
        (pos: Position) => {
          observer.next(pos);
        },
        (err) => {
          return;
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  }


  
}
