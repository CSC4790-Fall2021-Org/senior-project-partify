import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditComponent } from './edit.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EditComponent
  ],
  providers: [],
  exports: [EditComponent]
})
export class EditModule {}