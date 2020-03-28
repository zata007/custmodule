import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerStateService } from '../../customer-state.service';
import { OrderService } from '../../order.service';
declare var MediaRecorder: any;
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @ViewChild('recordedPlayer', {static: false}) recordedPlayer: ElementRef;
  selectedImage: File;
  uploadedImg: any = null;
  mediaRecorder = null;
  hasRecorded = false;
  previewMode = false;
  hasRecordingStarted = false;
  recordedAudio: HTMLAudioElement;
  audioUrl: string;
  businessId: any;
  businessName: any;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private customerStateService: CustomerStateService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.businessId = params.id;
      this.businessName = params.name;
  });

  }

  onMicClick() {
    if (this.hasRecordingStarted) {
      // need to stop and save
      this.mediaRecorder.stop();
    } else {
      // start recording
     navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        this.hasRecordingStarted = true;
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        const audioChunks = [];
        this.mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
          console.log('stopped done');
          stream.getTracks().forEach(t => t.stop());
          const audioBlob = new Blob(audioChunks);
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.recordedAudio = new Audio(this.audioUrl);
          // TODO: This recorded audio can be sent to backend
          this.hasRecorded = true;
          this.previewMode = true;
          setTimeout(() => {
            this.recordedPlayer.nativeElement.src = this.audioUrl;
          }, 100);
        }, {once: true});
      });
    }
    setTimeout(() => {
      this.mediaRecorder.stop();
    }, 61000);
  }

  onSaveClick() {
    this.customerStateService.updateCurrentService('order-ahead');
    //this.orderService.

    this.router.navigate(['customer/cart-view']);
  }

  onRecordingClear() {
    this.hasRecorded = false;
    this.hasRecordingStarted = false;
    this.previewMode = false;
  }

  onBackClick() {
    this.location.back();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: Event) => {
        this.uploadedImg = reader.result;
        this.previewMode = true;
      };
    }
  }

  onCancelClick() {
    if (this.hasRecorded) {
      this.onRecordingClear();
    } else {
      this.cancelPhoto();
    }

    this.resetState();

  }

  resetState() {
    this.previewMode = false;
    this.hasRecorded = false;
    this.hasRecordingStarted = false;
    this.mediaRecorder = null;
    this.uploadedImg = null;
    this.selectedImage = null;
  }

  cancelPhoto() {
    this.uploadedImg = null;
  }

}
