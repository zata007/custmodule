import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IProfileData, IUpdateProfiledata } from '../../../shared/models/common-model';
import { ZATAAKSE_PROFILE_DATA } from '../../../shared/constants/constants';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profile : IProfileData;
  image: any;
  langs: Array<{value: String; viewValue: String}> = [
    {value: 'en', viewValue: 'English'},
    {value: 'hn', viewValue: 'Hindi'},
    {value: 'bn', viewValue: 'Bengali'},
    {value: 'mr', viewValue: 'Marathi'},
    {value: 'gu', viewValue: 'Bengali'}
  ]
  profileForm: FormGroup;
  updateProfile: any = [];
  selectedImage: File;

  constructor(
    private location: Location,
    private dataService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    this.profileForm = new FormGroup ({
      indFirstName: new FormControl('', [Validators.required]),
      indLastName: new FormControl(''),
      indEmail: new FormControl('', [Validators.required, Validators.email]),
      indDob: new FormControl(''),
      indGender: new FormControl(''),
      indFoodPref: new FormControl(''),
      indLanPref: new FormControl(''),
    })

    this.profile = JSON.parse(localStorage.getItem(ZATAAKSE_PROFILE_DATA));
    if(this.profile.indDetail.basic.indPic) {
      this.image = this.profile.indDetail.basic.indPic[0].thumbnail;
    } else {
      this.image = '../../../assets/img/core/user.png';
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: Event) => {
        this.image = reader.result;
      }
      this.updateProfile = {
        ...this.updateProfile,
        indPic: [
          {image: this.selectedImage}
        ]
      }
    }
  }

  onBackClick() {
    this.location.back();
  }

  firstNameChange() {
    this.updateProfile ={
      ...this.updateProfile,
      indFirstName: this.profileForm.value['indFirstName']
    }
  }

  lastNameChange () {
    this.updateProfile ={
      ...this.updateProfile,
      indLastName: this.profileForm.value['indLastName']
    }
  }

  emailChange() {
    this.updateProfile ={
      ...this.updateProfile,
      indEmail: this.profileForm.value['indEmail']
    }
  }

  dobChange() {
    this.updateProfile ={
      ...this.updateProfile,
      indDob: this.profileForm.value['indDob']
    }
  }

  genderChange() {
    this.updateProfile ={
      ...this.updateProfile,
      indGender: this.profileForm.value['indGender']
    }
  }

  foodchange() {
    this.updateProfile ={
      ...this.updateProfile,
      indFoodPref: this.profileForm.value['indFoodPref']
    }
  }

  langChange() {
    this.updateProfile ={
      ...this.updateProfile,
      indLanPref: this.profileForm.value['indLanPref']
    }
  }

  onSubmit() {    
    console.log(this.updateProfile)
    this.dataService.updateProfile(this.updateProfile).subscribe((data) => {
      console.log('success');
      this.router.navigate(['customer/profile']);
    });
  }

}
