import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  clicked: boolean = false;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onMicClick() {
    this.clicked = this.clicked ? false: true;
  }

  onBackClick() {
    this.location.back();
  }

}
