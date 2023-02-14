import {Component} from '@angular/core';
import {NgbActiveOffcanvas, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import * as EN_US_TRANSLATION from '../assets/i18n/en-US.json';

import {CHOFilter} from './shared/types/cho/filter/CHOFilter';
import {CHOStatsScreenComponent} from './views/cho/stats-screen/cho-stats-screen.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {CHOSummaryScreenComponent} from './views/cho/summary-screen/cho-summary-screen.component';
import {BackendService} from './shared/services/backend.service';
import {TableService} from './shared/components/table/table.service';

@Component({
    selector: 'lmap-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private backendService: BackendService,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
        public tableService: TableService,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');
    }

    activeButtonId: string = 'map-button';
    atlasFilter: CHOFilter = new CHOFilter();
    title: string = 'leaflet-map';

    onOpenCHOsStats(event: Event, buttonId: string) {
        this.updateActiveButtonId(buttonId);
        const modalRef = this.modalService.open(CHOStatsScreenComponent, {fullscreen: true});
        modalRef.componentInstance.resetActiveButtonId = this.resetActiveButtonId;
    }

    onOpenCHOsSummaries(event: Event, buttonId: string) {
        this.updateActiveButtonId(buttonId);

        const modalRef = this.modalService.open(CHOSummaryScreenComponent, {fullscreen: true});
        modalRef.componentInstance.filter = this.atlasFilter;
        modalRef.componentInstance.resetActiveButtonId = this.resetActiveButtonId;
        this.activeOffcanvas.close();

        this.backendService.chosSummaries$
            .subscribe(summaries => {
                this.tableService.rawData = summaries;
            });
    }

    onOpenSidebar(event: Event, buttonId: string) {
        this.updateActiveButtonId(buttonId);

        event.preventDefault();
        event.stopPropagation();

        // const options = {
        //     panelClass: 'atlas-filter',
        //     scroll: true
        // } as NgbOffcanvasOptions;
        const offcanvasRef = this.offcanvasService.open(SidebarComponent);
        offcanvasRef.componentInstance.filter = this.atlasFilter;
        offcanvasRef.componentInstance.name = 'Cultural Leaf Filter';
        offcanvasRef.componentInstance.resetActiveButtonId = this.resetActiveButtonId;
        offcanvasRef.hidden.subscribe(value => {
            this.resetActiveButtonId();
        });
    }

    updateActiveButtonId = (buttonId: string) => {
        this.activeButtonId = buttonId;
    };

    resetActiveButtonId = () => {
        this.activeButtonId = 'map-button';
    };
}
