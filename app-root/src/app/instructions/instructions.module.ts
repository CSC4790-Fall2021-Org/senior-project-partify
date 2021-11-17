import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionsComponent } from './instructions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    InstructionsComponent
  ],
  providers: [],
  exports: [InstructionsComponent]
})
export class InstructionsModule {}