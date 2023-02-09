import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveOffcanvas, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {CHOSummaryScreenComponent} from '../summary-screen/cho-summary-screen.component';
import {BackendService} from '../../../shared/services/backend.service';
import {TableService} from '../../../shared/components/table/table.service';

import {CHO_DISPLAY_STATES, CHO_TYPES, CHOFilter, FilterInterval} from '../../../shared/types/cho/CHOFilter';

@Component({
    selector: 'lmap-cho-filter',
    templateUrl: './cho-filter.component.html',
    styleUrls: ['./cho-filter.component.scss']
})
export class CHOFilterComponent implements OnInit {
    totalCHOs$: Observable<number>;
    counterClickable = true;

    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private backendService: BackendService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        public tableService: TableService
    ) {
        this.totalCHOs$ = backendService.totalCHOs$;

        this.modalService.activeInstances
            .subscribe(openedModals => {
                for (const modalInstance of openedModals) {
                    if (modalInstance.componentInstance instanceof CHOSummaryScreenComponent) {
                        this.counterClickable = false;
                        break;
                    }
                }
            });
    }

    @Input() filter: CHOFilter;
    @Input() onFilterApply: Function;

    form: FormGroup;

    createFormControls() {
        return {
            county: new FormControl,
            displayState: new FormControl(),
            endDate: new FormControl(this.filter.creationInterval?.end.date, [
                this.timePeriodValidator('endDate', 'endRange')
            ]),
            endRange: new FormControl(),
            epoch: new FormControl(),
            inventoryNumber: new FormControl(this.filter.inventoryNumber, [
                Validators.minLength(3)
            ]),
            medalShape: new FormControl(),
            natureAge: new FormControl(),
            natureEpoch: new FormControl(),
            natureSex: new FormControl(),
            startDate: new FormControl(this.filter.creationInterval?.start.date, [
                this.timePeriodValidator('startDate', 'startRange')
            ]),
            startRange: new FormControl(),
            title: new FormControl(this.filter.title, [
                Validators.minLength(3)
            ]),
            type: new FormControl()
        };
    }

    timePeriodValidator = (dateName: string, rangeName: string): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const startDate  = this.form?.controls?.[dateName].value;
            const startRange  = this.form?.controls?.[rangeName].value;

            if (!startDate) {
                return null;
            }
            return !startRange
                ? {rangeRequired: {value: !!startRange}}
                : null;
        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            this.createFormControls()
        );
    }

    // TODO: form control validation: https://github.com/loiane/angular-reactive-forms-validate-submit/blob/97a7e9ebd834b0913c15a0fc27fe19b2ffe9a05d/src/app/validate-fields-submit-form/validate-fields-submit-form.component.ts#L54
    onSubmit() {
        // this.filter.prepareBackendData();
        const filter = new CHOFilter();
        filter.displayState = CHO_DISPLAY_STATES.MEDIOCRE;
        filter.type = CHO_TYPES.BIOLOGICAL_OBJECT;

        this.backendService.museumsSummariesSubscription(this.filter);
        this.backendService.choCounterSubscription(this.filter);

        this.onFilterApply && this.onFilterApply();
    }

    onSectionReset(event: Event) {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = _.get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'general-info-filter':
                this.filter.title = null;
                this.filter.inventoryNumber = null;
                this.filter.displayState = null;
                this.filter.type = null;
                break;
            case 'current-location':
                this.filter.county = null;
                break;
            case 'creation-period':
                this.filter.creationInterval = new FilterInterval();
                break;
            case 'finding-period':
                this.filter.foundInterval = new FilterInterval();
                break;
            case 'medal-filter':
                this.filter.medalFilter.shape = null;
                break;
            case 'natural-science-filter':
                this.filter.natureFilter.age = null;
                this.filter.natureFilter.epoch = null;
                this.filter.natureFilter.sex = null;
                break;
            default:
                break;
        }
    }

    openCHOsModal = () => {
        if (!this.counterClickable) {
            return;
        }

        const modalRef = this.modalService.open(CHOSummaryScreenComponent, {fullscreen: true});
        modalRef.componentInstance.filter = this.filter;
        this.activeOffcanvas.close();

        this.backendService.chosSummaries$
            .subscribe(summaries => {
                this.tableService.rawData = summaries;
            });
    }
}
