import { Component, OnInit } from '@angular/core';
import { PlaylistCoverComponent } from '../playlist-cover/playlist-cover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'app-home';

  constructor() { }

  ngOnInit(): void {
  }

}
