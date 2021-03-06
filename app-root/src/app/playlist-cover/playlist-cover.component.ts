import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    {name: "Energy"},
    {name: "Camelot"},
    {name: "Edit Further"}
  ]

  constructor(private service: SpotifyService,
              private route: ActivatedRoute,
              private router: Router) { }

  getPlaylistFromAPI() {
    this.service.getPlaylist().subscribe((res: any) => {
      this.playlists = res.body.items
    }, (error) => {
      console.log("error ", error)
    })

  }

  ngOnInit(): void {
    this.getPlaylistFromAPI();
  }


  onChange(event: any){
    let val = event.target.value;
    let playlist_id = event.target.id
    if(val === 'Edit Further') {
      this.router.navigate(['/edit', playlist_id]);
    }
    if (val === 'Danceability') {
      this.sendPlaylistId(playlist_id, '1')
    }
    if (val === 'BPM') {
      this.sendPlaylistId(playlist_id, '2')
    }
    if (val === 'Energy') {
      this.sendPlaylistId(playlist_id, '3')
    }
    if (val === 'Camelot') {
      this.sendPlaylistId(playlist_id, '4')
    }
  }

  sendPlaylistId(playlist_id: any, option: any) {
    this.service.partify(playlist_id, option).subscribe((res) => {
      console.log('it sent', res)
      alert("Playlist has been partified! Please check your Spotify account for the new playlist.");
      location.reload();
    }, (err) => {
      console.log('it did not work', err)
    });
  }
}
