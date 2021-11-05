import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-cover',
  templateUrl: './playlist-cover.component.html',
  styleUrls: ['./playlist-cover.component.css'],
})

export class PlaylistCoverComponent implements OnInit {

  playlists: any[] = [
    {name: "playlist1", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist2", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist3", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist4", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist5", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist6", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist7", img:"../../assets/images/playlistCover.PNG"},
    {name: "playlist8", img:"../../assets/images/playlistCover.PNG"},
  ]

  menuOption: any[] = [
    {name: "Danceability"},
    {name: "BPM"},
    {name: "Camelot"},
    {name: "Edit Further"}
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // onChange(menuOption: any) {
  //   console.log("Value: ", this.menuOption);
  // }

  onChange(value: any){
    console.log(value);
    if(value === 'Edit Further') {
      this.router.navigate(['/edit']);
    }
  }
}
