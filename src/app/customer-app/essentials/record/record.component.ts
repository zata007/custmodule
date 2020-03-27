import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  clicked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onMicClick() {
    this.clicked = this.clicked ? false: true;
  }

}
