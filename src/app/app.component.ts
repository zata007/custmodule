import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Fingerprint2 from 'fingerprintjs2';
import { CommonService } from './shared/services/common.service';
import { LOCAL_STORAGE_FINGERPRINT } from './shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zataakse';
  constructor(private translationService: TranslateService, private commonService: CommonService) {
    translationService.addLangs(['en', 'bn']);
    translationService.getTranslation('bn').subscribe();
    translationService.getTranslation('en').subscribe();
  }

  ngOnInit(): void {
    Fingerprint2.get({}, (components) => {
      const values = components.map((component) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      localStorage.setItem(LOCAL_STORAGE_FINGERPRINT, murmur);
      this.commonService.setFingerPrint(murmur);
    });
  }
}
