import { Component, OnInit } from '@angular/core';
import { PlaylistCoverComponent } from '../playlist-cover/playlist-cover.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'app-home';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.router.navigate(['/edit'])
  }

}
