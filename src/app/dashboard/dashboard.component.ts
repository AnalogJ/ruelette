import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Router} from '@angular/router'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  public tripit_trips:Array<any> = [];
  public markers:Array<any> = [];

  constructor(private cookieService:CookieService, private router: Router, private apiService:ApiService) { }

  ngOnInit() {
    if (!this.cookieService.get('RUELETTE_AUTH')) {
      return this.router.navigate(['/auth/connect']);
    }

    this.apiService.tripitFindAllTrips().subscribe(
        data => {

          for (var ndx in data.Trip) {
            this.tripit_trips.push({
              display_name: data.Trip[ndx].display_name,
              id: data.Trip[ndx].id,
              primary_location: data.Trip[ndx].PrimaryLocationAddress
            })
          }

        },
        error => console.log(error)
    )

  }

  toggleTripitTripLayerOnMap(trip_details) {
    //this function should be called whenever the
    console.log(trip_details)
    this.lat = parseFloat(trip_details.primary_location.latitude);
    this.lng = parseFloat(trip_details.primary_location.longitude);

    this.apiService.tripitFindOneTrip(trip_details.id).subscribe(
        data => {

          console.log("GOT THE TRIP DETAILS")

          // here are all the Tripit object types that we can map
          var types = ['AirObject','ActivityObject','CruiseObject','LodgingObject','RailObject','TransportObject'];

          for(let type of types){
            if(!data[type]){
              console.log("COULD NOT FIND TYPE:" + type)
              continue
            }

            //lets clean up the data returned by Tripit, sometimes its a bit messy.
            if(!Array.isArray(data[type])){
              data[type] = [data[type]] //if there is only one item, make sure it is inside an array.
            }

            //process/add the tripit item to the map.

            for(let entry of data[type]){
              var marker = null
              if((type == 'ActivityObject') || (type == 'LodgingObject')){
                marker = {
                  label: entry.display_name,
                  lat: parseFloat(entry.Address.latitude),
                  lng: parseFloat(entry.Address.longitude)
                }
              }
              if(marker){
                console.log("PUSHING MARKER")
                console.dir(marker)
                this.markers.push(marker)
              }
            }

          }

        },
        error => console.log(error)
    )
  }


}
