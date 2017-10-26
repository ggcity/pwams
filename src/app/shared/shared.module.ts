import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleizePipe } from './pipes/titleize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TitleizePipe
  ],
  exports: [ CommonModule, TitleizePipe ]
})
export class SharedModule { }
