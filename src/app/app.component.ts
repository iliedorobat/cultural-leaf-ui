import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as EN_US_TRANSLATION from '../assets/i18n/en-US.json';

@Component({
    selector: 'lmap-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');
    }

    title = 'leaflet-map';
}
