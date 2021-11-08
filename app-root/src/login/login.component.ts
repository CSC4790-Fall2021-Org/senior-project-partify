import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app-login'
  constructor(private service: SpotifyService) { }

  clickEvent() {
    console.log('clicked');
    this.getLoginFromAPI();
  }

  getLoginFromAPI() {
    this.service.getLogin().subscribe((response) => {
      console.log('Response from API is ', response)
    }, (error) => {
      console.log("error response is ", error)
    })
  }

  getPlaylistFromAPI() {
    this.service.getPlaylist().subscribe((res) => {
      console.log('Playlist is ', res)
    }, (error) => {
      console.log("error ", error)
    })

  }

  ngOnInit(): void {
  }
}