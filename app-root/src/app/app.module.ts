import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginModule } from '../login/login.module';
import { EditModule } from '../edit/edit.module'

import { SpotifyService } from 'src/services/spotify.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,LoginModule, EditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
