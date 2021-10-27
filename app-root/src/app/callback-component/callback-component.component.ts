import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/services/spotify.service';

@Component({
  selector: 'app-callback-component',
  templateUrl: './callback-component.component.html',
  styleUrls: ['./callback-component.component.css']
})
export class CallbackComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private service: SpotifyService) { }

  ngOnInit(): void {
    this.service.getCallback().subscribe((res) => {
      console.log('Res ', res);
    }, (err) => {
      console.log('error ', err);
    })
    const code = this.route.snapshot.queryParamMap.get('code');
    console.log('this is the code');
    console.log(code);

    this.router.navigate(['/home']);
  }

}
