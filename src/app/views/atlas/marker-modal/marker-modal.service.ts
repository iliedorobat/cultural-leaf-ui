import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {BackendService} from '../../../shared/services/backend.service';
import {MarkerModalComponent} from './marker-modal.component';

import {ModalPayload} from '../../../shared/types/ModalPayload';
import {Museum} from '../../../shared/types/museum/Museum';
import {MuseumSummary} from '../../../shared/types/museum/MuseumSummary';

@Injectable({
    providedIn: 'root'
})
export class MarkerModalService {
    constructor(
        private backendService: BackendService,
        private modalService: NgbModal,
        private zone: NgZone
    ) {}

    private payload: ModalPayload = {
        data: {},
        title: null
    };
    // private subject = new BehaviorSubject<ModalPayload>(this.payload);
    // public payload$: Observable<ModalPayload> = this.subject.asObservable();

    // TODO: data => Museum type
    public openSummary = (title: string | null, entitySummary: MuseumSummary): void => {
        // this.payload = data;
        // this.subject.next(this.payload);

        if (title || !_.isEmpty(entitySummary)) {
            this.backendService.getMuseumDetails(entitySummary.uri)
                .subscribe((museumPayload: Museum) => {
                    const modalRef = this.modalService.open(MarkerModalComponent, {scrollable: true});
                    modalRef.componentInstance.title = title;
                    modalRef.componentInstance.payload = museumPayload;
                });
        }
    };

    // private openModal = () => {
    //   this.zone.run(() => {
    //     this.dialog.open(MarkerModalComponent, {
    //       data: this.payload,
    //       width: '30%',
    //       maxHeight: '80%'
    //     });
    //   });
    // };
}
