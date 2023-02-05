import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {HttpService} from '../../../shared/services/http.service';
import {Museum} from '../../../shared/types/museum/Museum';
import {SECTIONS_ORDER} from './maker-modal.const';

@Component({
    selector: 'lmap-marker-modal',
    templateUrl: './marker-modal.component.html',
    styleUrls: ['./marker-modal.component.scss'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class MarkerModalComponent implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private translate: TranslateService,
        private httpService: HttpService
    ) {}

    @Input() title: string;
    @Input() payload: Museum;
    SECTIONS: Array<string> = [];

    ngOnInit(): void {
        this.SECTIONS = SECTIONS_ORDER.filter(key => this.payload[key]);
    }
}
