import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {BackendService} from '../../../shared/services/backend.service';
import {CHODetails} from '../../../shared/types/cho/CHODetails';
import {CHOFilter} from '../../../shared/types/cho/filter/CHOFilter';
import {CHOSummary} from '../../../shared/types/cho/CHOSummary';
import {DetailsScreenComponent} from '../../../shared/screens/details-screen/details-screen.component';
import {SortableHeader, SortEvent} from '../../../shared/components/table/sortable.directive';
import {TableService} from '../../../shared/components/table/table.service';

import {CHO_SECTIONS_ORDER} from '../../../shared/screens/details-screen/details-screen.const';
import {ENTITY_TYPE} from '../../../shared/constants/entity.enum';

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
        private modalService: NgbModal,
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
    @Input() resetActiveButtonId: Function;

    ngOnInit(): void {
        this.onFilterApply();
    }

    onFilterApply = () => {
        this.tableService.page = 1;
        this.backendService.chosSummariesSubscription(this.filter);
    }

    onRowClick(summary: CHOSummary) {
        this.backendService.getCHODetails(summary.uri)
            .subscribe((choPayload: CHODetails) => {
                const modalRef = this.modalService.open(DetailsScreenComponent, {scrollable: true});
                modalRef.componentInstance.entityType = ENTITY_TYPE.CHO;
                modalRef.componentInstance.i18nPrefix = 'choDetailsModal';
                modalRef.componentInstance.sections = CHO_SECTIONS_ORDER;
                modalRef.componentInstance.title = summary.title;
                modalRef.componentInstance.payload = choPayload;
            });
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

    onViewClose = () => {
        this.activeModal.close();
        this.resetActiveButtonId();
    };
}
