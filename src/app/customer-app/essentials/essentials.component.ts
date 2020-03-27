import { Component, OnInit } from '@angular/core';
import { RecordComponent } from './record/record.component';
import { MatDialog, MatBottomSheet, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-essentials',
  templateUrl: './essentials.component.html',
  styleUrls: ['./essentials.component.scss']
})
export class EssentialsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
  }

  onRecord() {
    const record = this.bottomSheet.open(RecordComponent);
  }

}
