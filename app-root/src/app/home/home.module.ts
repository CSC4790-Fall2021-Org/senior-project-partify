import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { PlaylistCoverModule } from '../playlist-cover/playlist-cover.module'
import { TopbarModule } from '../topbar/topbar.module'

@NgModule({
  imports: [CommonModule, PlaylistCoverModule, TopbarModule],
  declarations: [
    HomeComponent
  ],
  providers: [],
  exports: [HomeComponent]
})
export class HomeModule {}