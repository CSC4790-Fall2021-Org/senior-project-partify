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
    let playlist_id = this.route.snapshot.paramMap.get('id');
    this.getSongsFromAPI(playlist_id)
    this.getRecsFromAPI(playlist_id)

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

}
