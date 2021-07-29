import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

import { MatBottomSheet, MatBottomSheetConfig, MatDialogConfig, MatDialog } from '@angular/material';
import { ChatComponent } from '../Chat/chat/chat.component';
import { JwtTokenService } from '../Client-Auth/jwt-token.service';
import { DevelopersComponent } from '../developers/developers.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private nav: HeaderService,
    private BottomSheet: MatBottomSheet,
    private jwtService: JwtTokenService,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.nav.show();

    if (this.jwtService.getToken()) {
      const BottomConfig = new MatBottomSheetConfig();
      BottomConfig.autoFocus = true;
    // BottomConfig.panelClass = BottomSheetCss;
      this.BottomSheet.open(ChatComponent, {
      panelClass: 'BottomSheetCss'
    });
    }

    if (!this.jwtService.getToken()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      this.dialog.open(DevelopersComponent, dialogConfig);
      // window.alert('login please');
    }
  }

  onChatClick() {
    const BottomConfig = new MatBottomSheetConfig();
    BottomConfig.autoFocus = true;
    // BottomConfig.panelClass = BottomSheetCss;
    this.BottomSheet.open(ChatComponent, {
      panelClass: 'BottomSheetCss'
    });
  }
}


