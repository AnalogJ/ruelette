import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-auth-connect',
  templateUrl: './auth-connect.component.html',
  styleUrls: ['./auth-connect.component.css']
})
export class AuthConnectComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  connectTripit(){
    this.apiService.connectServiceUrl('tripit')
        .subscribe(
            data => {window.location.href = data.url},
            error => console.log(error)
        )
    console.log('CONNECT TIPIT CLICKED')
  }

}
