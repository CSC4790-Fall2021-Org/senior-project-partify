import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EditModule } from './edit/edit.module';
import { LoginModule } from './login/login.module';
import { PlaylistCoverModule } from './playlist-cover/playlist-cover.module';
import { HomeModule } from './home/home.module';
import { TopbarModule } from './topbar/topbar.module';
import { AppRoutingModule } from './app-routing.module';

import { SpotifyService } from 'src/services/spotify.service';
import { CallbackComponentComponent } from './callback-component/callback-component.component';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponentComponent
  ],
  imports: [
    BrowserModule, EditModule, LoginModule, BrowserModule, FormsModule, ReactiveFormsModule, HomeModule, PlaylistCoverModule, TopbarModule, AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
