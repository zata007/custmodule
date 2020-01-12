import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Fingerprint2 from 'fingerprintjs2';
import { CommonService } from './shared/services/common.service';
import { LOCAL_STORAGE_FINGERPRINT } from './shared/constants/constants';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zataakse';
  currentUrl: string;
  constructor(private translationService: TranslateService, private commonService: CommonService,
              private connectionService: ConnectionService,
              private router: Router, ) {
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

    this.connectionService.monitor().subscribe((isConnected) => {
      if (isConnected) {
        this.commonService.setUserConnectedStatus(true);
      } else {
        this.commonService.setUserConnectedStatus(false);
        this.currentUrl = this.router.url;
        this.router.navigate(['/no-internet'], {
          queryParams: {
            returnUrl: this.router.url,
          },
        });
      }
    });
  }
}
