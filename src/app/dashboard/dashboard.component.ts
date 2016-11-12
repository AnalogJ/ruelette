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

  public layers: any = {}
  public layer_names: Array<string> = [];


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

  addGoogleSearchLayerOnMap(search_terms, lat_lng){

  }


  toggleTripitTripLayerOnMap(trip_details) {

    if(!trip_details.selected){
      //we're unselecting this trip, so delete it from the array.
      var index = this.layer_names.indexOf('tripit:' + trip_details.id);
      this.layer_names.splice(index, 1)
      return
    }
    else if(this.layers['tripit:'+trip_details.id]){
      //this layer was downloaded previously, lets reuse it //TODO: we need a chaching mechanism of some sort instead of coode hacks.
      this.layer_names.push('tripit:'+trip_details.id)
      return 
    }

    //this function should be called whenever the
    console.log(trip_details)
    this.lat = parseFloat(trip_details.primary_location.latitude);
    this.lng = parseFloat(trip_details.primary_location.longitude);

    this.apiService.tripitFindOneTrip(trip_details.id).subscribe(
        data => {

          var layer_markers = [];
          var layer_polylines = [];

          console.log("GOT THE TRIP DETAILS")

          // here are all the Tripit object types that we can map
          //TODO: these should be enums/constants
          var types = [
            {
              type:'AirObject',
              marker:'marker_plane.png'
            },{
              type:'ActivityObject',
              marker:'marker_eye.png'
            },{
              type:'CarObject',
              marker: 'marker_car.png'
            },{
              type:'CruiseObject',
              marker: 'marker_ship.png'
            },{
              type:'LodgingObject',
              marker: 'marker_home.png'
            },{
              type:'NoteObject',
              marker: 'marker_star.png',
            },{
              type:'RailObject',
              marker: 'marker_train.png'

            },{
              type:'RestaurantObject',
              marker: 'marker_food.png'

            },{
              type:'TransportObject',
              marker: 'marker_bus.png'

            }];

          for(let type_enum of types){
            if(!data[type_enum.type]){
              console.log("COULD NOT FIND TYPE:" + type_enum.type)
              continue
            }

            //lets clean up the data returned by Tripit, sometimes its a bit messy.
            if(!Array.isArray(data[type_enum.type])){
              data[type_enum.type] = [data[type_enum.type]] //if there is only one item, make sure it is inside an array.
            }

            //process/add the tripit item to the map.

            for(let entry of data[type_enum.type]){
              if((type_enum.type == 'ActivityObject') || (type_enum.type == 'CarObject') || (type_enum.type == 'CruiseObject') || (type_enum.type == 'LodgingObject') || (type_enum.type == 'NoteObject') || (type_enum.type == 'RailObject') || (type_enum.type == 'RestaurantObject')){
                var marker = {
                  iconUrl: '/assets/img/markers/black/'+type_enum.marker,
                  lat: parseFloat(entry.Address.latitude),
                  lng: parseFloat(entry.Address.longitude)
                }

                if(marker.iconUrl && marker.lat && marker.lng){
                  console.log("PUSHING MARKER")
                  console.dir(marker)
                  layer_markers.push(marker)
                }
              }

              else if(type_enum.type == 'AirObject'){
                if(!Array.isArray(entry.Segment)){
                  entry.Segment = [entry.Segment] //make sure that Segment is an array.
                }
                for(let segment of entry.Segment){
                  var start_airport_marker = {
                    iconUrl: '/assets/img/markers/black/'+type_enum.marker,
                    lat: parseFloat(segment.start_airport_latitude),
                    lng: parseFloat(segment.start_airport_longitude)
                  }

                  var end_airport_marker = {
                    iconUrl: '/assets/img/markers/black/'+type_enum.marker,
                    lat: parseFloat(segment.end_airport_latitude),
                    lng: parseFloat(segment.end_airport_longitude)
                  }
                  layer_markers.push(start_airport_marker);
                  layer_markers.push(end_airport_marker);

                  layer_polylines.push({start: start_airport_marker, end: end_airport_marker})
                }


              }



            }

          }

          this.layers['tripit:'+ trip_details.id] = {
            markers: layer_markers,
            polylines: layer_polylines
          }
          this.layer_names.push('tripit:'+ trip_details.id)

        },
        error => console.log(error)
    )
  }


}
