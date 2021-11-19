import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/services/spotify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { state } from '@angular/animations';

@Component({
  selector: 'app-callback-component',
  templateUrl: './callback-component.component.html',
  styleUrls: ['./callback-component.component.css']
})
export class CallbackComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient, 
              private router: Router, 
              private service: SpotifyService) { }

  ngOnInit(): void {
    let code = this.route.snapshot.queryParamMap.get('code');
    let state = this.route.snapshot.queryParamMap.get('state');

   this.service.sendCode(code, state).subscribe((res) => {
     console.log('something happened I think', res)
    }, (err) => {
      console.log('this is a fat error ', err)
    })

    this.router.navigate(['/home']);
  }

}
