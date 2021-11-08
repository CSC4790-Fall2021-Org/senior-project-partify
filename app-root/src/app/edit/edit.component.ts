import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  songs: any [] = [
    {name: "Song1"},
    {name: "Song2"},
    {name: "Song3"},
    {name: "Song4"},
    {name: "Song5"},
    {name: "Song6"}
  ]

  recs: any [] = [
    {name: "Song7"},
    {name: "Song8"},
    {name: "Song9"},
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let playlist_id = this.route.snapshot.paramMap.get('id');
    console.log('this the id ', playlist_id)

  }

}
