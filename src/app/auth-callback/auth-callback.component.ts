import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {


  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('GETTING QUERY STRING PARAMS');
    console.log(this.activatedRoute.snapshot.params);
    console.log(this.activatedRoute.snapshot.queryParams);

    this.apiService.callbackWithToken(this.activatedRoute.snapshot.params['serviceType'], this.activatedRoute.snapshot.queryParams)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    console.log('CALLBACK')
  }
}
