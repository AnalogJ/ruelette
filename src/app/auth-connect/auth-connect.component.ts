import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-connect',
  templateUrl: './auth-connect.component.html',
  styleUrls: ['./auth-connect.component.css']
})
export class AuthConnectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  connectTripit(){
    console.log('CONNECT TIPIT CLICKED')
  }

}
