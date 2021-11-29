import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app-login'
  constructor(private service: SpotifyService,
              private router: Router) { }

  clickEvent() {
    console.log('clicked');
    // this.getLoginFromAPI();
  }

  getLoginFromAPI() {
    this.service.getLogin().subscribe((response) => {
      console.log('Response from API is ', response)
    }, (error) => {
      console.log("error response is ", error)
    })
  }

  ngOnInit(): void {
  }

}