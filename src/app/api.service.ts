import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class ApiService {
  private apiBaseUrl = 'https://api.ruelette.com/dev/';  // URL to web API

  constructor(private http: Http, private cookieService: CookieService) { }

  connectServiceUrl(serviceType): Observable<any>  {
    return this.http.get(this.apiBaseUrl + 'connect/' + serviceType)
        .map(this.extractData)
        .catch(this.handleError);
  }

  callbackWithToken(serviceType, postData): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBaseUrl + 'callback/' + serviceType, postData, options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  airbnbSearchByLatLng(lat:number, lng:number, radius:number): Observable<any> {

    var cir = new (<any>window).google.maps.Circle()
    cir.setCenter({lat: lat, lng: lng})
    cir.setRadius(radius)
    var bounding_box = cir.getBounds()
    console.log(bounding_box)
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('source', 'map');
    params.set('sw_lat', bounding_box.getSouthWest().lat());
    params.set('sw_lng', bounding_box.getSouthWest().lng());
    params.set('ne_lat', bounding_box.getNorthEast().lat());
    params.set('ne_lng', bounding_box.getNorthEast().lng());
    params.set('zoom', '10');


    return this.http.get(this.apiBaseUrl + 'external/airbnb/search',{search: params})
        .map(this.extractData)
        .catch(this.handleError);
  }


  tripitFindAllTrips(): Observable<any> {
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('auth', this.cookieService.get('RUELETTE_AUTH'));

    return this.http.get(this.apiBaseUrl + 'external/tripit/trips',{search: params})
        .map(this.extractData)
        .catch(this.handleError);
  }

  tripitFindOneTrip(trip_id): Observable<any> {
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('auth', this.cookieService.get('RUELETTE_AUTH'));

    return this.http.get(this.apiBaseUrl + 'external/tripit/trips/' + trip_id,{search: params})
        .map(this.extractData)
        .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
  }
}
