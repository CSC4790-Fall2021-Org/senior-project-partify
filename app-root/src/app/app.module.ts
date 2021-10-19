import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { PlaylistCoverModule } from './playlist-cover/playlist-cover.module';
import { HomeModule } from './home/home.module';
import { TopbarModule } from './topbar/topbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, LoginModule, BrowserModule, FormsModule, ReactiveFormsModule, HomeModule, PlaylistCoverModule, TopbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
