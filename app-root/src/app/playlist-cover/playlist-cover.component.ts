import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-playlist-cover',
  templateUrl: './playlist-cover.component.html',
  styleUrls: ['./playlist-cover.component.css'],
})

export class PlaylistCoverComponent implements OnInit {

  playlists: any[] = []

  constructor(private service: SpotifyService) { }

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

}
