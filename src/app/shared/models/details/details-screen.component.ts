import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {CHODetails} from '../../types/cho/CHODetails';
import {HttpService} from '../../services/http.service';
import {MuseumDetails} from '../../types/museum/MuseumDetails';

import {ENTITY_TYPE} from '../../constants/entity.enum';

@Component({
    selector: 'lmap-details-screen',
    templateUrl: './details-screen.component.html',
    styleUrls: ['./details-screen.component.scss'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class DetailsScreenComponent implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private httpService: HttpService,
        private translate: TranslateService
    ) {}

    @Input() entityType: ENTITY_TYPE;
    @Input() i18nPrefix: string;
    @Input() sections: string[] = [];
    @Input() title: string;
    @Input() payload: CHODetails | MuseumDetails;
    SECTIONS: string[] = [];

    ngOnInit(): void {
        this.SECTIONS = this.sections.filter(key => this.payload[key]);
    }
}
