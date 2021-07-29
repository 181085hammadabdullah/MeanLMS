import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmBuyComponent } from './confirm-buy/confirm-buy.component';





@NgModule({
  declarations: [ConfirmBuyComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ]
})
export class ViewCourseModule { }
