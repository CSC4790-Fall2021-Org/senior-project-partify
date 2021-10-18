import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app-login'
  constructor() { }

  clickEvent() {
    console.log('clicked')
  }

  ngOnInit(): void {
  }
}