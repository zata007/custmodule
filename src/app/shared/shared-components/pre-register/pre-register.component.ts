import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-register',
  templateUrl: './pre-register.component.html',
  styleUrls: ['./pre-register.component.scss']
})
export class PreRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: number) {
    // TODO: Send register data.
  }

}
