import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    MatBottomSheetModule
  ]
})
export class ChatModule { }
