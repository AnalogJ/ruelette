import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private cookieService:CookieService, private router: Router) { }

  ngOnInit() {
    if(!this.cookieService.get('RUELETTE_AUTH')){
      this.router.navigate(['/auth/connect']);
    }
  }

}
