import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  songs: any [] = []

  playlistName: any;
  playlist_id: any;

  recs: any [] = [
    {name: "Song7"},
    {name: "Song8"},
    {name: "Song9"},
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SpotifyService) { }

  ngOnInit(): void {
    this.playlist_id = this.route.snapshot.paramMap.get('id');
    this.getPlaylistNameFromAPI(this.playlist_id);
    this.getSongsFromAPI(this.playlist_id)
    this.getRecsFromAPI(this.playlist_id)
  }

  getPlaylistNameFromAPI(playlist_id: any) {
    this.service.getPlaylistName(playlist_id).subscribe((res: any) => {
      this.playlistName = res.body.name;
    }, (err) => {
      console.log('error ', err);
    })
  }

  getSongsFromAPI(playlist_id: any) {
    this.service.getPlaylistSongs(playlist_id).subscribe((res: any) => {
      this.songs = res.body.items
    }, (err) => {
      console.log("error", err)
    })
  }

  getRecsFromAPI(playlist_id: any) {
    this.service.getRecSongs(playlist_id).subscribe((res: any) => {
      this.recs = res.body.tracks
      console.log('rec songs ', this.recs)
    }, (err) => {
      console.log("error", err)
    })
  }

  addSong(song_id: any) {
    console.log('The plus was clicked and this is the song id', song_id);
    this.service.addSong(song_id, this.playlist_id).subscribe((res: any) => {
      location.reload();
    }, (err) => {
      console.log("error", err);
    })
  }

  removeSong(song_id: any) {
    console.log('The x was clicked and this is the song id', song_id);
    this.service.removeSong(song_id, this.playlist_id).subscribe((res: any) => {
      location.reload();
    }, (err) => {
      console.log("error", err);
    })
  }

}
