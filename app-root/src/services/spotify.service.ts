import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  baseUrl: string = "http://localhost:4200";

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('/api/getData')
  }

  getPlaylist() {
    return this.http.get('/api/randomPlaylist')
  }

  getLogin() {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get('/api/login', {'headers':headers})
  }

  getCallback() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get('/api/callback', {'headers':headers})
  }
}
