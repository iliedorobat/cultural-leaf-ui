import {Component, Input, OnInit} from '@angular/core';
import {DataItem} from '@swimlane/ngx-charts/lib/models/chart-data.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {BackendService} from '../../../shared/services/backend.service';
import {CHOStatsFilter} from '../../../shared/types/cho/stats/CHOStatsFilter';

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

    @Input() resetActiveButtonId: Function;

    filter: CHOStatsFilter = new CHOStatsFilter();
    collectingDataset: DataItem[] = [];
    findingDataset: DataItem[] = [];
    productionDataset: DataItem[] = [];
    showCollectingLabels: boolean = false;
    showFindingLabels: boolean = false;
    showProductionLabels: boolean = false;

    ngOnInit(): void {
        this.onFilterApply();

        this.backendService.chosProductionStats$
            .subscribe(stats => {
                const entries = stats?.entries;
                this.showProductionLabels = !!entries;
                this.productionDataset = entries || [{name: 'Loading...', value: 100}];
            });

        this.backendService.chosFindingStats$
            .subscribe(stats => {
                const entries = stats?.entries;
                this.showFindingLabels = !!entries;
                this.findingDataset = entries || [{name: 'Loading...', value: 100}];
            });

        this.backendService.chosCollectingStats$
            .subscribe(stats => {
                const entries = stats?.entries;
                this.showCollectingLabels = !!entries;
                this.collectingDataset = entries || [{name: 'Loading...', value: 100}];
            });
    }

    onFilterApply = () => {
        if (this.filter.productionTime.show) {
            this.backendService.chosProductionStatsSubscription(this.filter, this.filter.productionTime.range);
        }
        if (this.filter.findingTime.show) {
            this.backendService.chosFindingStatsSubscription(this.filter, this.filter.findingTime.range);
        }
        if (this.filter.collectingTime.show) {
            this.backendService.chosCollectingStatsSubscription(this.filter, this.filter.collectingTime.range);
        }
    }

    onViewClose = () => {
        this.activeModal.close();
        this.resetActiveButtonId();
    };
}
