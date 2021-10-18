import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app-root';

  constructor(private service: SpotifyService) {

  }

  ngOnInit() {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.service.getData().subscribe((response) => {
      console.log('Response from API is ', response)
    }, (error) => {
      console.log("Error response is ", error);
    })
  }
}
