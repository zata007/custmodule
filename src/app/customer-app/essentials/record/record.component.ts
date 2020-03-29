import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerStateService } from '../../customer-state.service';
import { OrderService } from '../../order.service';
import { ECustomerServiceType } from 'src/app/shared/constants/constants';
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
  audioBlob: Blob;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private customerStateService: CustomerStateService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params.id) {
        this.router.navigate(['customer']);
      }
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

        const recorderTimeoutRef =  setTimeout(() => {
          if (this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
          }
        }, 61000);

        this.mediaRecorder.addEventListener('stop', () => {
          console.log('stopped done');
          stream.getTracks().forEach(t => t.stop());
          this.audioBlob = new Blob(audioChunks);
          this.audioUrl = URL.createObjectURL(this.audioBlob);
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

  }

  onSaveClick() {
    this.customerStateService.updateCurrentService(ECustomerServiceType.Essential);
    // Set data to be used in cart-view page
    this.customerStateService.currentEssentialServiceData = {
      displayName: this.businessName,
      id: this.businessId,
      file: this.hasRecorded ?  new Blob([this.audioBlob], { type: 'audio/wav' }) : this.selectedImage, // TODO: Attach file
      isRecording: this.hasRecorded
    };
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

  seeSample(link: string) {
    window.open(link);
  }

}
