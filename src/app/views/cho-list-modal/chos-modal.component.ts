import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {SidebarCHOFilter} from '../sidebar-filter/SidebarCHOFilter';
import {BackendService} from '../../shared/services/backend.service';

@Component({
    selector: 'lmap-chos-modal',
    templateUrl: './chos-modal.component.html',
    styleUrls: ['./chos-modal.component.scss'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class ChosModalComponent implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private backendService: BackendService,
        private translate: TranslateService
    ) {}

    @Input() filter: SidebarCHOFilter;

    ngOnInit(): void {
        console.log('filter:', this.filter);

        this.backendService.chosSubscription(this.filter);
        this.backendService.chosSummaries$
            .subscribe(summaries => {
                console.log('summaries:', summaries);
            })
    }
}
