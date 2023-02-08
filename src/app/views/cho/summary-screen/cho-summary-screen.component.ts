import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {CHOFilter} from '../../../shared/types/cho/CHOFilter';
import {BackendService} from '../../../shared/services/backend.service';
import {SortableHeader, SortEvent} from '../../../shared/components/table/sortable.directive';
import {TableService} from '../../../shared/components/table/table.service';

@Component({
    selector: 'lmap-cho-summary-screen',
    templateUrl: './cho-summary-screen.component.html',
    styleUrls: ['./cho-summary-screen.component.scss'],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal]
})
export class CHOSummaryScreenComponent implements OnInit {
    data$: Observable<any>;
    total$: Observable<number>;

    constructor(
        public activeModal: NgbActiveModal,
        private backendService: BackendService,
        public tableService: TableService,
        private translate: TranslateService
    ) {
        this.data$ = tableService.data$;
        this.total$ = tableService.total$;

        this.backendService.chosSummaries$
            .subscribe(summaries => {
                this.tableService.rawData = summaries;
            });
    }

    @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;
    @Input() filter: CHOFilter;

    ngOnInit(): void {
        this.onFilterApply();
    }

    onFilterApply = () => {
        this.tableService.page = 1;
        this.backendService.chosSummariesSubscription(this.filter);
    }

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.tableService.sortColumn = column;
        this.tableService.sortDirection = direction;
    }
}
