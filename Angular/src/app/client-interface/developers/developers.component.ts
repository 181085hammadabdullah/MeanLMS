import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<DevelopersComponent>
    ) { }

  ngOnInit() {

  }

  onClick() {
    this.dialogRef.close();
    this.router.navigate(['/Main-Features']);
  }
  onClose() {
    this.dialogRef.close();
  }
}
