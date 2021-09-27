import { Component, OnInit } from '@angular/core';

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
    {name: "playlist6", img:"../../assets/images/playlistCover.PNG"}
  ]
//   constructor(){
//     this.playlists = [
//       {name: "playlist1", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist2", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist3", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist4", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist5", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist6", img:"../../assets/images/playlistCover.PNG"},
//     ]
//   }
//   getPlaylists(): void{
//     this.playlists = [
//       {name: "playlist1", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist2", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist3", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist4", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist5", img:"../../assets/images/playlistCover.PNG"},
//       {name: "playlist6", img:"../../assets/images/playlistCover.PNG"},
//     ]
//   }
  constructor() { }

  ngOnInit(): void {
  }

}
