import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService extends GoogleMapsAPIWrapper{

  constructor(private loader: MapsAPILoader, private ngzone: NgZone) {
    super(loader, ngzone);
  }

  // getLatLan(address: string) {
  //   console.log('Getting Address - ', address);

  //   const geocoder = new google.maps.Geocoder();
  //   return Observable.create(observer => {
  //     geocoder.geocode({ address }, (results, status) => {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         observer.next(results[0].geometry.location);
  //         observer.complete();
  //       } else {
  //         console.log('Error - ', results, ' & Status - ', status);
  //         observer.next({});
  //         observer.complete();
  //       }
  //     });
  //   });
  // }

  getLatLan(address: string) {
    return Observable.create(observer => {
      try {
        this.loader.load().then(() => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address }, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
              const place = results[0].geometry.location;
              observer.next(place);
              observer.complete();
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                observer.error('Address not found!');
              } else {
                observer.error(status);
              }

              observer.complete();
            }
          });
        });
      } catch (error) {
        observer.error('error getGeocoding' + error);
        observer.complete();
      }

    });
  }
}
