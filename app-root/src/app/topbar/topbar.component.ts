import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{ 
  title = 'app-topbar';

  user: any;

  constructor(private service: SpotifyService) { }

  ngOnInit(): void {
    this.getUserFromAPI();
  }

  getUserFromAPI() {
    this.service.getUserId().subscribe((res: any) => {
      this.user = res.body.display_name;
    }, (err) => {
      console.log("error ", err);
    })
  }
}