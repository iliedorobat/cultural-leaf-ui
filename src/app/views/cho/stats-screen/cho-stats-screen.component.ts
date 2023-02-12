import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {BackendService} from '../../../shared/services/backend.service';
import {TIMESPAN_TYPE} from '../../../shared/constants/entity.enum';
import {CHOStatsFilter} from '../../../shared/types/cho/CHOStatsFilter';

@Component({
    selector: 'lmap-cho-stats-screen',
    templateUrl: './cho-stats-screen.component.html',
    styleUrls: ['../summary-screen/cho-summary-screen.component.scss'],
    // encapsulation: ViewEncapsulation.ShadowDom
})
export class CHOStatsScreenComponent implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private backendService: BackendService,
        private translate: TranslateService
    ) {}
    filter: CHOStatsFilter = new CHOStatsFilter();

    // TODO: any
    creationDataset: any[] = [];
    foundDataset: any[] = [];
    showCreationLabels: boolean = false;
    showFoundLabels: boolean = false;

    ngOnInit(): void {
        // TODO:
        this.backendService.chosCreationStatsSubscription(this.filter, this.filter.creationTime.range);
        this.backendService.chosFoundStatsSubscription(this.filter, this.filter.foundTime.range);

        this.backendService.chosCreationStats$
            .subscribe(stats => {
                const entries = stats?.entries;
                this.showCreationLabels = !!entries;
                this.creationDataset = entries || [{name: 'Loading...', value: 100}];
            });

        this.backendService.chosFoundStats$
            .subscribe(stats => {
                const entries = stats?.entries;
                this.showFoundLabels = !!entries;
                this.foundDataset = entries || [{name: 'Loading...', value: 100}];
            });
    }

    onFilterApply = () => {
        if (this.filter.creationTime.show) {
            this.backendService.chosCreationStatsSubscription(this.filter, this.filter.creationTime.range);
        }
        if (this.filter.foundTime.show) {
            this.backendService.chosFoundStatsSubscription(this.filter, this.filter.foundTime.range);
        }
    }
}
