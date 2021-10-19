import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app-login'
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.router.navigate(['/home'])
  }

}