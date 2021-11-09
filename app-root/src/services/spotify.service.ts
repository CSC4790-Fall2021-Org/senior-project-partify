import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { state } from '@angular/animations';

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

  sendCode(code: any, state: any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    let code_json = {code: code, state: state}
    let json_code = JSON.stringify(code_json)
    return this.http.post('/api/callback', json_code, {'headers': headers})
  }

  partify(playlist_id: any, option: any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json');
    let playlist_id_json = {playlist_id: playlist_id, option: option}
    let json_playlist = JSON.stringify(playlist_id_json)
    return this.http.post('/api/algorithm', json_playlist, {'headers': headers})
  }
}
