import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SkeletonComponent } from './shared/shared-components/skeleton/skeleton.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zataakse';
  constructor(private translationService: TranslateService){
    translationService.addLangs(['en', 'bn']);
    translationService.getTranslation('bn').subscribe();
    translationService.getTranslation('en').subscribe();
  }
}
