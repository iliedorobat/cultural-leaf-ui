import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

import {BackendService} from '../../../shared/services/backend.service';
import {CHOStatsFilter} from '../../../shared/types/cho/stats/CHOStatsFilter';
import {CHOEventStatsEntry} from '../../../shared/types/cho/stats/CHOEventStats';

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
    creationDataset: CHOEventStatsEntry[] = [];
    foundDataset: CHOEventStatsEntry[] = [];
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

    onViewClose = () => {
        this.activeModal.close();
        this.resetActiveButtonId();
    };
}
