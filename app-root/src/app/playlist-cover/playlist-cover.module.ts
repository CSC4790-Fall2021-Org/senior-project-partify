import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistCoverComponent } from './playlist-cover.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PlaylistCoverComponent
  ],
  providers: [],
  exports: [PlaylistCoverComponent]
})
export class PlaylistCoverModule {}