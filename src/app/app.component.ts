import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Fingerprint2 from 'fingerprintjs2';
import { CommonService } from './shared/services/common.service';
import { LOCAL_STORAGE_FINGERPRINT, ZATAAKSE_JWT_TOKEN, ZATAAKSE_PREF_LANG } from './shared/constants/constants';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zataakse';
  currentUrl: string;
  constructor(
    private translationService: TranslateService,
    private commonService: CommonService,
    private connectionService: ConnectionService,
    private router: Router,
    private dataService: DataService
  ) {
    Fingerprint2.get({}, (components) => {
      const values = components.map((component) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      localStorage.setItem(LOCAL_STORAGE_FINGERPRINT, murmur);
      this.commonService.setFingerPrint(murmur);
    });
  }

  ngOnInit() {
    this.translationService.addLangs(['en', 'bn']);
    this.translationService.getTranslation('bn').subscribe();
    this.translationService.getTranslation('en').subscribe();
    this.translationService.use(localStorage.getItem(ZATAAKSE_PREF_LANG) || 'en').subscribe();
    if (!localStorage.getItem(ZATAAKSE_JWT_TOKEN) && localStorage.getItem(ZATAAKSE_PREF_LANG)) {
      this.router.navigate(['customer']);
      return;
    }
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

    window.setInterval(() => {
      const data = {
        ...this.commonService.getRequestEssentialParams()
      }
      this.dataService.checkInternet(data).subscribe(res=>{
        this.commonService.setUserConnectedStatus(true);
      }, error => {
        this.commonService.setUserConnectedStatus(false);
        this.router.navigate(['/no-internet'], {
          queryParams: {
            returnUrl: this.router.url,
          }
        });
      })
    }, 2000);

    // TODO: Fetch location and Platform params once token is setup.
  }
}
