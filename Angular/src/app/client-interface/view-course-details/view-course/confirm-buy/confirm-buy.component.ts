import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-buy',
  templateUrl: './confirm-buy.component.html',
  styleUrls: ['./confirm-buy.component.css']
})
export class ConfirmBuyComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmBuyComponent>) { }

  ngOnInit() {
  }

  onConfirm() {
    this.dialogRef.close();
    this.router.navigate(['Lms/Lectures']);
  }
}
