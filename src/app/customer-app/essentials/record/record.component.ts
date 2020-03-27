import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  clicked: boolean = false;
  photoShown: boolean = true;
  audioShown: boolean = true;
  selectedImage: File;
  image: any = null;


  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onMicClick() {
    this.clicked = this.clicked ? false: true;
    this.photoShown = false;
  }

  onBackClick() {
    this.location.back();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: Event) => {
        this.image = reader.result;
        this.audioShown = false;
      }
    }
  }

  cancelPhoto() {
    this.image= null;
    this.audioShown = true;
  }

}
