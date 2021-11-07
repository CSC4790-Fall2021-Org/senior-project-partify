import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-playlist-cover',
  templateUrl: './playlist-cover.component.html',
  styleUrls: ['./playlist-cover.component.css'],
})

export class PlaylistCoverComponent implements OnInit {

  playlists: any[] = []

  menuOption: any[] = [
    {name: "Danceability"},
    {name: "BPM"},
    {name: "Camelot"},
    {name: "Edit Further"}
  ]

  constructor(private service: SpotifyService,
              private router: Router) { }

  getPlaylistFromAPI() {
    this.service.getPlaylist().subscribe((res: any) => {
      this.playlists = res.body.items
      console.log('Playlist are ', this.playlists)
    }, (error) => {
      console.log("error ", error)
    })

  }

  ngOnInit(): void {
    this.getPlaylistFromAPI();
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
