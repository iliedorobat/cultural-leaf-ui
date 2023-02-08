import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {BackendService} from '../../../shared/services/backend.service';

@Component({
    selector: 'lmap-cho-details-screen',
    templateUrl: './cho-details-screen.component.html',
    styleUrls: ['./cho-details-screen.component.scss']
})
export class CHODetailsScreenComponent {
    constructor(
        public activeModal: NgbActiveModal,
        private backendService: BackendService,
        private translate: TranslateService
    ) {}
}
